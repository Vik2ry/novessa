import hmac
import json
from hashlib import sha512

import requests
from django.conf import settings

from apps.donations.models import Donation
from apps.mailer.services import MailgunEmailService


class PaymentError(RuntimeError):
    pass


def initialize_paystack_checkout(donation: Donation) -> str:
    callback_url = f"{settings.FRONTEND_URL}/donate/success?reference={donation.reference}"
    if not settings.PAYSTACK_SECRET_KEY or settings.PAYSTACK_SECRET_KEY.startswith("sk_test_replace"):
        return callback_url

    response = requests.post(
        f"{settings.PAYSTACK_BASE_URL}/transaction/initialize",
        headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
        json={
            "email": donation.donor_email,
            "amount": donation.amount_minor,
            "currency": donation.currency,
            "reference": donation.reference,
            "callback_url": callback_url,
            "metadata": {
                "donor_name": donation.donor_name,
                "campaign_slug": donation.campaign_slug,
                **donation.metadata,
            },
        },
        timeout=15,
    )
    response.raise_for_status()
    payload = response.json()
    if not payload.get("status"):
        raise PaymentError(payload.get("message", "Unable to initialize Paystack checkout"))
    return payload["data"]["authorization_url"]


def is_valid_paystack_signature(raw_body: bytes, signature: str) -> bool:
    if not settings.PAYSTACK_SECRET_KEY or not signature:
        return False
    expected = hmac.new(settings.PAYSTACK_SECRET_KEY.encode(), raw_body, sha512).hexdigest()
    return hmac.compare_digest(expected, signature)


def apply_paystack_event(raw_body: bytes, signature: str):
    from apps.donations.models import PaymentWebhookEvent

    payload = json.loads(raw_body.decode("utf-8") or "{}")
    data = payload.get("data", {})
    event_type = payload.get("event", "unknown")
    signature_valid = is_valid_paystack_signature(raw_body, signature)
    webhook = PaymentWebhookEvent.objects.create(
        provider="paystack",
        event_type=event_type,
        event_id=str(data.get("id", data.get("reference", ""))),
        signature_valid=signature_valid,
        payload=payload,
    )
    if not signature_valid:
        webhook.error = "Invalid Paystack signature"
        webhook.save(update_fields=["error"])
        return webhook

    donation = Donation.objects.filter(reference=data.get("reference")).first()
    if not donation:
        webhook.error = "Donation not found"
        webhook.save(update_fields=["error"])
        return webhook

    webhook.donation = donation
    if event_type == "charge.success":
        donation.status = Donation.Status.COMPLETED
        donation.provider_reference = data.get("reference", donation.reference)
        donation.save(update_fields=["status", "provider_reference", "updated_at"])
        MailgunEmailService.donation_receipt(
            donation.donor_email,
            donation.donor_name,
            donation.amount_display,
            donation.reference,
        )
    elif event_type in {"charge.failed", "charge.abandoned"}:
        donation.status = Donation.Status.FAILED
        donation.save(update_fields=["status", "updated_at"])
    elif event_type == "refund.processed":
        donation.status = Donation.Status.REFUNDED
        donation.save(update_fields=["status", "updated_at"])
    webhook.processed = True
    webhook.save(update_fields=["donation", "processed"])
    return webhook
