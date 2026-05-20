import hmac
import json
from hashlib import sha512

import pytest

from apps.donations.models import Donation


@pytest.mark.django_db
def test_paystack_webhook_completes_donation(client, settings, monkeypatch):
    settings.PAYSTACK_SECRET_KEY = "paystack-secret"
    monkeypatch.setattr("apps.donations.services.MailgunEmailService.donation_receipt", lambda *args, **kwargs: None)
    donation = Donation.objects.create(donor_email="donor@example.com", amount_minor=1500000)
    payload = {"event": "charge.success", "data": {"reference": donation.reference, "id": 123}}
    raw = json.dumps(payload).encode()
    signature = hmac.new(b"paystack-secret", raw, sha512).hexdigest()
    response = client.post(
        "/api/v1/donations/webhooks/paystack/",
        data=raw,
        content_type="application/json",
        HTTP_X_PAYSTACK_SIGNATURE=signature,
    )
    assert response.status_code == 200
    donation.refresh_from_db()
    assert donation.status == Donation.Status.COMPLETED


@pytest.mark.django_db
def test_paystack_webhook_rejects_bad_signature(client, settings):
    settings.PAYSTACK_SECRET_KEY = "paystack-secret"
    response = client.post(
        "/api/v1/donations/webhooks/paystack/",
        data=json.dumps({"event": "charge.success", "data": {"reference": "missing"}}).encode(),
        content_type="application/json",
        HTTP_X_PAYSTACK_SIGNATURE="bad",
    )
    assert response.status_code == 400
