import pytest

from apps.content.models import ContentItem


@pytest.mark.django_db
def test_site_payload_returns_published_content(client):
    ContentItem.objects.create(
        content_type="program",
        slug="mental-health-awareness",
        title="Updated Program",
        summary="Visible program",
        status="published",
    )
    response = client.get("/api/v1/content/site/")
    assert response.status_code == 200
    payload = response.json()
    featured_program = next(item for item in payload["programs"] if item["slug"] == "mental-health-awareness")
    assert featured_program["title"] == "Updated Program"
    assert payload["hero"]["title"]
    assert payload["impactMetrics"]
    assert payload["trustPillars"]


@pytest.mark.django_db
def test_content_detail_falls_back_to_seed_defaults(client):
    response = client.get("/api/v1/content/program/mental-health-awareness/")
    assert response.status_code == 200
    assert response.json()["slug"] == "mental-health-awareness"


@pytest.mark.django_db
def test_story_payload_preserves_default_order_when_database_is_partial(client):
    ContentItem.objects.create(
        content_type="story",
        slug="changing-the-conversation",
        title="Changing the Conversation",
        summary="Older story record",
        status="published",
    )
    response = client.get("/api/v1/content/site/")
    assert response.status_code == 200
    payload = response.json()
    assert payload["stories"][0]["slug"] == "how-n5000-changed-aminas-school-year"


@pytest.mark.django_db
def test_site_payload_keeps_default_images_when_published_record_is_partial(client):
    ContentItem.objects.create(
        content_type="program",
        slug="mental-health-awareness",
        title="Updated Program",
        summary="Visible program",
        external_image_url="",
        status="published",
    )
    response = client.get("/api/v1/content/site/")
    assert response.status_code == 200
    payload = response.json()
    featured_program = next(item for item in payload["programs"] if item["slug"] == "mental-health-awareness")
    assert featured_program["imageUrl"]


@pytest.mark.django_db
def test_story_list_endpoint_appends_extra_database_items(client):
    ContentItem.objects.create(
        content_type="story",
        slug="changing-the-conversation",
        title="Changing the Conversation",
        summary="Older story record",
        status="published",
    )
    response = client.get("/api/v1/content/story/")
    assert response.status_code == 200
    payload = response.json()
    assert any(item["slug"] == "changing-the-conversation" for item in payload["results"])
