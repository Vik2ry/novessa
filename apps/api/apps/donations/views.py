import json

from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from apps.donations.models import Donation
from apps.donations.services import apply_paystack_event, initialize_paystack_checkout


def serialize_donation(donation: Donation) -> dict:
    return {
        "id": donation.id,
        "reference": donation.reference,
        "provider": donation.provider,
        "donorName": donation.donor_name,
        "donorEmail": donation.donor_email,
        "amountMinor": donation.amount_minor,
        "amountDisplay": donation.amount_display,
        "currency": donation.currency,
        "campaignSlug": donation.campaign_slug,
        "status": donation.status,
        "checkoutUrl": donation.checkout_url,
        "createdAt": donation.created_at.isoformat(),
    }


@csrf_exempt
@require_POST
def create_donation(request: HttpRequest):
    payload = json.loads(request.body.decode("utf-8") or "{}")
    donation = Donation.objects.create(
        provider=payload.get("provider", Donation.Provider.PAYSTACK),
        donor_name=payload.get("donorName", ""),
        donor_email=payload["donorEmail"],
        amount_minor=int(payload["amountMinor"]),
        currency=payload.get("currency", "NGN"),
        campaign_slug=payload.get("campaignSlug", "community-care-fund"),
        metadata=payload.get("metadata", {}),
    )
    donation.checkout_url = initialize_paystack_checkout(donation)
    donation.save(update_fields=["checkout_url"])
    return JsonResponse(serialize_donation(donation), status=201)


@require_GET
def donation_detail(_request: HttpRequest, reference: str):
    donation = Donation.objects.get(reference=reference)
    return JsonResponse(serialize_donation(donation))


@csrf_exempt
@require_POST
def paystack_webhook(request: HttpRequest):
    webhook = apply_paystack_event(
        raw_body=request.body,
        signature=request.headers.get("x-paystack-signature", ""),
    )
    if not webhook.signature_valid:
        return JsonResponse({"status": "error", "message": "Invalid signature"}, status=400)
    return JsonResponse({"status": "ok", "processed": webhook.processed})
