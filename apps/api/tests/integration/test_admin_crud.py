import pytest
from django.contrib.auth import get_user_model

from apps.content.models import ContentItem


@pytest.mark.django_db
def test_staff_can_crud_content_through_admin(client):
    User = get_user_model()
    User.objects.create_superuser("admin", "admin@example.com", "password")
    assert client.login(username="admin", password="password")

    add_response = client.post(
        "/admin/content/contentitem/add/",
        {
            "content_type": "story",
            "slug": "admin-crud-story",
            "title": "Admin CRUD Story",
            "summary": "Created in test",
            "body": "Body",
            "category": "Test",
            "status": "published",
            "sort_order": 10,
            "metadata": "{}",
            "_save": "Save",
        },
        follow=True,
    )
    assert add_response.status_code == 200
    item = ContentItem.objects.get(slug="admin-crud-story")
    change_response = client.post(
        f"/admin/content/contentitem/{item.id}/change/",
        {
            "content_type": "story",
            "slug": "admin-crud-story",
            "title": "Updated Admin CRUD Story",
            "summary": "Updated",
            "body": "Body",
            "category": "Test",
            "status": "published",
            "sort_order": 10,
            "metadata": "{}",
            "_save": "Save",
        },
        follow=True,
    )
    assert change_response.status_code == 200
    item.refresh_from_db()
    assert item.title == "Updated Admin CRUD Story"
