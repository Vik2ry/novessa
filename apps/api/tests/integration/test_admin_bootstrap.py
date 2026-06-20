import pytest
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import override_settings

from apps.core.admin_bootstrap import ensure_admin_user


@pytest.mark.django_db
@override_settings(ADMIN_USERNAME="admin", ADMIN_EMAIL="admin@novessafoundation.org.ng", ADMIN_PASSWORD="ChangeMe123!")
def test_create_admin_command_repairs_existing_admin_account(client):
    User = get_user_model()
    user = User.objects.create_user(
        username="admin",
        email="old@example.com",
        password="wrong-password",
        is_active=False,
        is_staff=False,
        is_superuser=False,
    )

    call_command("create_admin")

    user.refresh_from_db()
    assert user.email == "admin@novessafoundation.org.ng"
    assert user.is_active is True
    assert user.is_staff is True
    assert user.is_superuser is True
    assert user.check_password("ChangeMe123!")
    assert client.login(username="admin", password="ChangeMe123!")
    assert client.get("/admin/").status_code == 200


@pytest.mark.django_db
@override_settings(ADMIN_USERNAME="admin", ADMIN_EMAIL="admin@novessafoundation.org.ng", ADMIN_PASSWORD="")
def test_admin_bootstrap_uses_safe_default_when_password_env_is_blank(client):
    result = ensure_admin_user()

    assert result.created is True
    assert client.login(username="admin", password="ChangeMe123!")
