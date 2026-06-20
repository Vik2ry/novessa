def test_health_endpoint(client):
    response = client.get("/api/v1/health/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_diagnose_reports_admin_readiness(client, django_user_model):
    django_user_model.objects.create_superuser("admin", "admin@novessafoundation.org.ng", "password")

    response = client.get("/api/v1/diagnose/")

    assert response.status_code == 200
    assert response.json() == {
        "admin_user_exists": True,
        "admin_user_id": 1,
        "admin_user_email": "admin@novessafoundation.org.ng",
        "admin_user_is_active": True,
        "admin_user_is_staff": True,
        "admin_user_is_superuser": True,
        "admin_user_has_usable_password": True,
        "total_users": 1,
    }
