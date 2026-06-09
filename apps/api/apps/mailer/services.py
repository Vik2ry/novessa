import logging
from dataclasses import dataclass

from django.conf import settings
from django.core.mail import EmailMultiAlternatives

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class EmailMessage:
    to: str | list[str]
    subject: str
    text: str
    html: str = ""
    tags: tuple[str, ...] = ()
    variables: dict | None = None


class EmailService:
    """Outbound email boundary backed by Django's configured email backend."""

    @classmethod
    def send(cls, message: EmailMessage) -> dict | None:
        if settings.EMAIL_LOG_TO_CONSOLE:
            logger.warning("EMAIL_PREVIEW to=%s subject=%s", message.to, message.subject)
            return None

        if cls._smtp_backend_needs_credentials() and (
            not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD
        ):
            logger.warning("SMTP email is not configured. Skipping outbound email.")
            return None

        recipients = message.to if isinstance(message.to, list) else [message.to]
        email = EmailMultiAlternatives(
            subject=message.subject,
            body=message.text,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=recipients,
        )
        if message.html:
            email.attach_alternative(message.html, "text/html")
        sent_count = email.send(fail_silently=False)
        return {"sent": sent_count, "recipients": recipients, "tags": list(message.tags)}

    @staticmethod
    def _smtp_backend_needs_credentials() -> bool:
        return settings.EMAIL_BACKEND == "django.core.mail.backends.smtp.EmailBackend"

    @classmethod
    def donation_receipt(cls, to_email: str, donor_name: str, amount_display: str, reference: str) -> dict | None:
        return cls.send(
            EmailMessage(
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
            EmailMessage(
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


MailgunMessage = EmailMessage
MailgunEmailService = EmailService
