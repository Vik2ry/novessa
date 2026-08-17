from django.http import Http404, JsonResponse

from apps.content.defaults import FALLBACK_SITE_SETTINGS
from apps.content.models import ContentItem, SiteSetting


def serialize_content(item: ContentItem) -> dict:
    return {
        "id": item.id,
        "type": item.content_type,
        "slug": item.slug,
        "title": item.title,
        "summary": item.summary,
        "body": item.body,
        "category": item.category,
        "imageUrl": item.image_url,
        "featured": item.featured,
        "metadata": item.metadata,
    }


def published_items(content_type: str) -> list[dict]:
    """
    Every published item of this content type, straight from the database -
    nothing merged in, nothing implied to exist that doesn't. If an item is
    deleted or unpublished, it is absent from this list, full stop.
    """
    return [
        serialize_content(item)
        for item in ContentItem.objects.filter(content_type=content_type, status=ContentItem.Status.PUBLISHED)
    ]


def list_content(_request, content_type: str):
    return JsonResponse({"results": published_items(content_type)})


def content_detail(_request, content_type: str, slug: str):
    item = ContentItem.objects.filter(
        content_type=content_type,
        slug=slug,
        status=ContentItem.Status.PUBLISHED,
    ).first()
    if not item:
        raise Http404("Content not found")
    return JsonResponse(serialize_content(item))


def site_payload(_request):
    hero = SiteSetting.objects.filter(key="homepage_hero").first()
    summary = SiteSetting.objects.filter(key="site_summary").first()
    base_payload = summary.value if summary else FALLBACK_SITE_SETTINGS
    payload = {
        **base_payload,
        "hero": hero.value if hero else base_payload["hero"],
        "programs": published_items("program"),
        "stories": published_items("story"),
        "campaigns": published_items("campaign"),
        "partners": published_items("partner"),
    }
    return JsonResponse(payload)
