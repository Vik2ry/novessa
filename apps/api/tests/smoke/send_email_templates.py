"""Manual smoke script for Novessa outbound email templates.

This intentionally avoids database models. It sends the current code-rendered
email templates directly through the configured Django email backend.

Usage:
    python tests/smoke/send_email_templates.py
"""

from __future__ import annotations

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")

import django
from django.conf import settings

django.setup()

from apps.mailer.services import EmailService  # noqa: E402


RECIPIENT = "segunbanji@gmail.com"


def validate_settings() -> None:
    missing = []
    for name in ("EMAIL_HOST", "EMAIL_PORT", "EMAIL_HOST_USER", "EMAIL_HOST_PASSWORD", "DEFAULT_FROM_EMAIL"):
        if not getattr(settings, name, None):
            missing.append(name)
    if missing:
        raise RuntimeError(f"Missing email settings: {', '.join(missing)}")
    if "replace-with" in settings.EMAIL_HOST_USER or "replace-with" in settings.DEFAULT_FROM_EMAIL:
        raise RuntimeError("EMAIL_HOST_USER and DEFAULT_FROM_EMAIL must be set to the configured Gmail address.")


def main() -> int:
    validate_settings()
    settings.EMAIL_LOG_TO_CONSOLE = False

    sends = [
        (
            "donation_receipt",
            lambda: EmailService.donation_receipt(
                RECIPIENT,
                "Segun Banji",
                "NGN 15,000",
                "NOVESSA-SMOKE-EMAIL-001",
            ),
        ),
        (
            "volunteer_confirmation",
            lambda: EmailService.volunteer_confirmation(
                RECIPIENT,
                "Segun Banji",
            ),
        ),
    ]

    for name, send in sends:
        result = send()
        sent_count = result["sent"] if result else 0
        print(f"{name}: sent={sent_count} to={RECIPIENT}")
        if sent_count != 1:
            raise RuntimeError(f"{name} did not report exactly one sent message.")

    print("Email template smoke check completed without database writes.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
