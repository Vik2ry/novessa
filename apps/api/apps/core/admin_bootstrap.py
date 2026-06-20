from __future__ import annotations

from dataclasses import dataclass

from django.conf import settings
from django.contrib.auth import get_user_model


@dataclass(frozen=True)
class AdminBootstrapResult:
    user: object
    created: bool
    changed_fields: tuple[str, ...]


def ensure_admin_user() -> AdminBootstrapResult:
    """Ensure the deployment admin account can always sign into Django admin."""
    username = getattr(settings, "ADMIN_USERNAME", "admin") or "admin"
    email = getattr(settings, "ADMIN_EMAIL", "admin@novessafoundation.org.ng") or "admin@novessafoundation.org.ng"
    password = getattr(settings, "ADMIN_PASSWORD", "ChangeMe123!") or "ChangeMe123!"

    User = get_user_model()
    user, created = User.objects.get_or_create(
        username=username,
        defaults={
            "email": email,
            "is_active": True,
            "is_staff": True,
            "is_superuser": True,
        },
    )

    changed_fields: list[str] = []

    for field_name, expected_value in {
        "email": email,
        "is_active": True,
        "is_staff": True,
        "is_superuser": True,
    }.items():
        if getattr(user, field_name) != expected_value:
            setattr(user, field_name, expected_value)
            changed_fields.append(field_name)

    if created or not user.check_password(password):
        user.set_password(password)
        changed_fields.append("password")

    if changed_fields:
        user.save(update_fields=changed_fields)

    return AdminBootstrapResult(user=user, created=created, changed_fields=tuple(changed_fields))
