import pytest
from django.core import mail

from apps.mailer.services import EmailService


@pytest.fixture(autouse=True)
def locmem_email(settings):
    settings.EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
    settings.EMAIL_LOG_TO_CONSOLE = False
    settings.DEFAULT_FROM_EMAIL = "Novessa Foundation <hello@novessafoundation.org.ng>"
    mail.outbox = []


def test_donation_receipt_sends_email():
    result = EmailService.donation_receipt(
        "donor@example.com",
        "Tolu Adeyemi",
        "NGN 15,000",
        "NOV-123",
    )

    assert result["sent"] == 1
    assert len(mail.outbox) == 1
    message = mail.outbox[0]
    assert message.to == ["donor@example.com"]
    assert message.subject == "Thank you for supporting Novessa Foundation"
    assert "NGN 15,000" in message.body
    assert "NOV-123" in message.body
    assert message.alternatives


def test_volunteer_confirmation_sends_email():
    result = EmailService.volunteer_confirmation("volunteer@example.com", "Tolu Adeyemi")

    assert result["sent"] == 1
    assert len(mail.outbox) == 1
    message = mail.outbox[0]
    assert message.to == ["volunteer@example.com"]
    assert message.subject == "We received your Novessa volunteer application"
    assert "Tolu Adeyemi" in message.body


def test_email_preview_mode_skips_sending(settings):
    settings.EMAIL_LOG_TO_CONSOLE = True

    result = EmailService.volunteer_confirmation("volunteer@example.com", "Tolu Adeyemi")

    assert result is None
    assert len(mail.outbox) == 0


def test_missing_smtp_credentials_skip_sending(settings):
    settings.EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    settings.EMAIL_HOST_USER = ""
    settings.EMAIL_HOST_PASSWORD = ""

    result = EmailService.volunteer_confirmation("volunteer@example.com", "Tolu Adeyemi")

    assert result is None
    assert len(mail.outbox) == 0
