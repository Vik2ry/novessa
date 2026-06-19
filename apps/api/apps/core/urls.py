from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.urls import path


def health(_request):
    return JsonResponse({"status": "ok", "service": "novessa-django-api"})


def diagnose(_request):
    """Diagnostic endpoint to check database state (remove in production)."""
    User = get_user_model()
    admin_user = User.objects.filter(username="admin").first()

    return JsonResponse(
        {
            "admin_user_exists": admin_user is not None,
            "admin_user_id": admin_user.id if admin_user else None,
            "admin_user_email": admin_user.email if admin_user else None,
            "admin_user_is_active": admin_user.is_active if admin_user else None,
            "admin_user_is_staff": admin_user.is_staff if admin_user else None,
            "admin_user_is_superuser": admin_user.is_superuser if admin_user else None,
            "admin_user_has_usable_password": admin_user.has_usable_password() if admin_user else None,
            "total_users": User.objects.count(),
        }
    )


urlpatterns = [
    path("health/", health, name="health"),
    path("diagnose/", diagnose, name="diagnose"),
]
