from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.urls import path


def health(_request):
    return JsonResponse({"status": "ok", "service": "novessa-django-api"})


def diagnose(_request):
    """Diagnostic endpoint to check database state (remove in production)."""
    User = get_user_model()
    admin_user = User.objects.filter(username="admin").first()
    
    return JsonResponse({
        "admin_user_exists": admin_user is not None,
        "admin_user_id": admin_user.id if admin_user else None,
        "admin_user_email": admin_user.email if admin_user else None,
        "total_users": User.objects.count(),
    })


urlpatterns = [
    path("health/", health, name="health"),
    path("diagnose/", diagnose, name="diagnose"),
]
