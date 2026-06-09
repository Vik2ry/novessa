import logging
from dataclasses import dataclass
from html import escape

from django.conf import settings
from django.core.mail import EmailMultiAlternatives

logger = logging.getLogger(__name__)

BRAND_NAVY = "#00263f"
BRAND_EMERALD = "#10b981"
BRAND_GOLD = "#fea619"
BRAND_SURFACE = "#f8f9ff"
BRAND_INK = "#0b1c30"
BRAND_MUTED = "#5b6472"
BRAND_BORDER = "#d3e4fe"


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

    @staticmethod
    def _email_shell(preheader: str, title: str, intro: str, content_html: str, footer_note: str) -> str:
        return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{escape(title)}</title>
  </head>
  <body style="margin:0; padding:0; background:{BRAND_SURFACE}; color:{BRAND_INK}; font-family:Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      {escape(preheader)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:{BRAND_SURFACE}; padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%; max-width:640px; background:#ffffff; border:1px solid {BRAND_BORDER}; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="background:{BRAND_NAVY}; padding:26px 30px;">
                <div style="font-size:13px; line-height:18px; letter-spacing:0.08em; text-transform:uppercase; color:{BRAND_GOLD}; font-weight:700;">
                  Novessa Foundation
                </div>
                <h1 style="margin:8px 0 0; color:#ffffff; font-size:26px; line-height:34px; font-weight:700;">
                  {escape(title)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                <p style="margin:0 0 18px; font-size:16px; line-height:26px; color:{BRAND_INK};">
                  {escape(intro)}
                </p>
                {content_html}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 30px; background:#eef6ff; border-top:1px solid {BRAND_BORDER};">
                <p style="margin:0; color:{BRAND_MUTED}; font-size:13px; line-height:20px;">
                  {escape(footer_note)}
                </p>
                <p style="margin:14px 0 0; color:{BRAND_MUTED}; font-size:12px; line-height:18px;">
                  Novessa Foundation · Building transparent, people-centered impact.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>"""

    @staticmethod
    def _detail_row(label: str, value: str, accent: str = BRAND_NAVY) -> str:
        return f"""
          <tr>
            <td style="padding:12px 14px; border-bottom:1px solid {BRAND_BORDER}; color:{BRAND_MUTED}; font-size:13px; line-height:18px; width:38%;">
              {escape(label)}
            </td>
            <td style="padding:12px 14px; border-bottom:1px solid {BRAND_BORDER}; color:{accent}; font-size:15px; line-height:22px; font-weight:700;">
              {escape(value)}
            </td>
          </tr>"""

    @classmethod
    def donation_receipt(cls, to_email: str, donor_name: str, amount_display: str, reference: str) -> dict | None:
        display_name = donor_name or "supporter"
        content_html = f"""
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid {BRAND_BORDER}; border-radius:10px; overflow:hidden; margin:22px 0; background:#ffffff;">
                  {cls._detail_row("Donation amount", amount_display, BRAND_EMERALD)}
                  {cls._detail_row("Reference", reference)}
                  {cls._detail_row("Status", "Received with gratitude", BRAND_GOLD)}
                </table>
                <p style="margin:0 0 18px; font-size:15px; line-height:25px; color:{BRAND_INK};">
                  Your support helps Novessa continue building programs rooted in dignity, access, and measurable community impact.
                </p>
                <p style="margin:0; font-size:15px; line-height:25px; color:{BRAND_INK};">
                  Please keep this email for your records. Our team will contact you if any additional confirmation is needed.
                </p>"""
        return cls.send(
            EmailMessage(
                to=to_email,
                subject="Thank you for supporting Novessa Foundation",
                text=(
                    f"Dear {display_name},\n\n"
                    f"Thank you for your donation of {amount_display}. "
                    f"Your reference is {reference}.\n\n"
                    "Your support helps Novessa continue building programs rooted in dignity, access, "
                    "and measurable community impact.\n\nNovessa Foundation"
                ),
                html=cls._email_shell(
                    preheader=f"Donation received: {amount_display}. Reference {reference}.",
                    title="Thank you for your support",
                    intro=f"Dear {display_name}, thank you for standing with Novessa Foundation.",
                    content_html=content_html,
                    footer_note="This receipt was generated for your Novessa Foundation donation.",
                ),
                tags=("donation-receipt",),
                variables={"reference": reference},
            )
        )

    @classmethod
    def volunteer_confirmation(cls, to_email: str, full_name: str) -> dict | None:
        content_html = f"""
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid {BRAND_BORDER}; border-radius:10px; overflow:hidden; margin:22px 0; background:#ffffff;">
                  {cls._detail_row("Application status", "Received", BRAND_EMERALD)}
                  {cls._detail_row("Next step", "Team review and follow-up")}
                </table>
                <p style="margin:0 0 18px; font-size:15px; line-height:25px; color:{BRAND_INK};">
                  Our team will review your application and reach out when there is a suitable opportunity to align your interests with current programs.
                </p>
                <p style="margin:0; font-size:15px; line-height:25px; color:{BRAND_INK};">
                  Thank you for offering your time and skills to support people-centered impact.
                </p>"""
        return cls.send(
            EmailMessage(
                to=to_email,
                subject="We received your Novessa volunteer application",
                text=(
                    f"Dear {full_name},\n\n"
                    "Thank you for offering your time to Novessa Foundation. "
                    "Our team will review your application and contact you soon.\n\n"
                    "Application status: Received\n"
                    "Next step: Team review and follow-up\n\n"
                    "Novessa Foundation"
                ),
                html=cls._email_shell(
                    preheader="Your Novessa volunteer application has been received.",
                    title="Volunteer application received",
                    intro=f"Dear {full_name}, thank you for offering your time to Novessa Foundation.",
                    content_html=content_html,
                    footer_note="This confirmation was generated after a volunteer application was submitted.",
                ),
                tags=("volunteer",),
            )
        )


MailgunMessage = EmailMessage
MailgunEmailService = EmailService
