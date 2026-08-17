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
def test_content_detail_404s_when_not_published(client):
    # No ContentItem created at all for this slug - previously this silently returned
    # hardcoded seed text; it must now 404, since nothing published exists for it.
    response = client.get("/api/v1/content/program/mental-health-awareness/")
    assert response.status_code == 404


@pytest.mark.django_db
def test_site_payload_excludes_anything_not_actually_published(client):
    # Only one real story exists in the database. None of the old hardcoded seed
    # slugs (e.g. how-n5000-changed-aminas-school-year) were ever created here, so
    # they must not appear - this is the exact "deleted default still showed up"
    # bug this test guards against regressing.
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
    assert [story["slug"] for story in payload["stories"]] == ["changing-the-conversation"]


@pytest.mark.django_db
def test_site_payload_does_not_merge_in_fallback_fields(client):
    # A published record with a genuinely blank image must show blank - not
    # silently inherit a stock photo from hardcoded seed data. No merging happens
    # anymore, full stop.
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
    assert featured_program["imageUrl"] == ""


@pytest.mark.django_db
def test_deleting_all_content_of_a_type_empties_it_on_the_frontend(client):
    # The exact reported bug: the writer deleted every seeded story, and the
    # site should now show zero stories - not silently keep showing the old
    # defaults forever.
    response = client.get("/api/v1/content/site/")
    assert response.status_code == 200
    payload = response.json()
    assert payload["stories"] == []
    assert payload["programs"] == []
    assert payload["partners"] == []
    assert payload["campaigns"] == []


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
