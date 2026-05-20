from django.http import Http404, JsonResponse

from apps.content.defaults import FALLBACK_SITE_SETTINGS, get_default_content_items
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


def merge_content_item(fallback_item: dict, published_item: dict) -> dict:
    merged = {
        **fallback_item,
        **published_item,
        "title": published_item["title"] or fallback_item["title"],
        "summary": published_item["summary"] or fallback_item["summary"],
        "body": published_item["body"] or fallback_item["body"],
        "category": published_item["category"] or fallback_item["category"],
        "imageUrl": published_item["imageUrl"] or fallback_item["imageUrl"],
        "metadata": {
            **fallback_item.get("metadata", {}),
            **published_item.get("metadata", {}),
        },
    }
    return merged


def published_items_or_fallback(content_type: str) -> list[dict]:
    fallback_items = get_default_content_items(content_type)
    published_items = [
        serialize_content(item)
        for item in ContentItem.objects.filter(
            content_type=content_type,
            status=ContentItem.Status.PUBLISHED,
        )
    ]
    if not published_items:
        return fallback_items

    published_by_slug = {item["slug"]: item for item in published_items}
    merged_items = [
        merge_content_item(item, published_by_slug.pop(item["slug"]))
        if item["slug"] in published_by_slug
        else item
        for item in fallback_items
    ]
    merged_items.extend(published_by_slug.values())
    return merged_items


def list_content(_request, content_type: str):
    return JsonResponse({"results": published_items_or_fallback(content_type)})


def content_detail(_request, content_type: str, slug: str):
    item = ContentItem.objects.filter(
        content_type=content_type,
        slug=slug,
        status=ContentItem.Status.PUBLISHED,
    ).first()
    if item:
        return JsonResponse(serialize_content(item))
    fallback = next((entry for entry in get_default_content_items(content_type) if entry["slug"] == slug), None)
    if not fallback:
        raise Http404("Content not found")
    return JsonResponse(fallback)


def site_payload(_request):
    hero = SiteSetting.objects.filter(key="homepage_hero").first()
    summary = SiteSetting.objects.filter(key="site_summary").first()
    base_payload = summary.value if summary else FALLBACK_SITE_SETTINGS
    payload = {
        **base_payload,
        "hero": hero.value if hero else base_payload["hero"],
        "programs": published_items_or_fallback("program")[:6],
        "stories": published_items_or_fallback("story")[:6],
        "campaigns": published_items_or_fallback("campaign")[:3],
        "partners": published_items_or_fallback("partner")[:12],
    }
    return JsonResponse(payload)
