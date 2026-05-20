import logging
from dataclasses import dataclass

import requests
from django.conf import settings

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class MailgunMessage:
    to: str | list[str]
    subject: str
    text: str
    html: str = ""
    tags: tuple[str, ...] = ()
    variables: dict | None = None


class MailgunEmailService:
    """Small Mailgun adapter modeled after Andromeda's email service boundary.

    Mailgun differs from MessagePipe in one important way: this app sends fully
    rendered messages to the Mailgun Messages API instead of sending a
    provider-specific template ID plus variables. That keeps the templates in
    the codebase/admin content and avoids binding Novessa to a dashboard-only
    template system.
    """

    @classmethod
    def send(cls, message: MailgunMessage) -> dict | None:
        if settings.EMAIL_LOG_TO_CONSOLE:
            logger.warning("EMAIL_PREVIEW to=%s subject=%s", message.to, message.subject)
        if not settings.MAILGUN_API_KEY or not settings.MAILGUN_DOMAIN:
            logger.warning("Mailgun is not configured. Skipping outbound email.")
            return None

        recipients = message.to if isinstance(message.to, list) else [message.to]
        data: dict[str, str | list[str]] = {
            "from": settings.MAILGUN_FROM_EMAIL,
            "to": recipients,
            "subject": message.subject,
            "text": message.text,
        }
        if message.html:
            data["html"] = message.html
        for tag in message.tags:
            data.setdefault("o:tag", [])
            data["o:tag"].append(tag)
        if message.variables:
            for key, value in message.variables.items():
                data[f"v:{key}"] = str(value)

        response = requests.post(
            f"{settings.MAILGUN_BASE_URL}/{settings.MAILGUN_DOMAIN}/messages",
            auth=("api", settings.MAILGUN_API_KEY),
            data=data,
            timeout=15,
        )
        response.raise_for_status()
        return response.json()

    @classmethod
    def donation_receipt(cls, to_email: str, donor_name: str, amount_display: str, reference: str) -> dict | None:
        return cls.send(
            MailgunMessage(
                to=to_email,
                subject="Thank you for supporting Novessa Foundation",
                text=(
                    f"Dear {donor_name or 'supporter'},\n\n"
                    f"Thank you for your donation of {amount_display}. "
                    f"Your reference is {reference}.\n\nNovessa Foundation"
                ),
                html=(
                    f"<p>Dear {donor_name or 'supporter'},</p>"
                    f"<p>Thank you for your donation of <strong>{amount_display}</strong>.</p>"
                    f"<p>Your reference is <strong>{reference}</strong>.</p>"
                ),
                tags=("donation-receipt",),
                variables={"reference": reference},
            )
        )

    @classmethod
    def volunteer_confirmation(cls, to_email: str, full_name: str) -> dict | None:
        return cls.send(
            MailgunMessage(
                to=to_email,
                subject="We received your Novessa volunteer application",
                text=(
                    f"Dear {full_name},\n\n"
                    "Thank you for offering your time to Novessa Foundation. "
                    "Our team will review your application and contact you soon."
                ),
                tags=("volunteer",),
            )
        )
