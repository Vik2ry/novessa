from django.http import Http404, JsonResponse

from apps.content.defaults import FALLBACK_SITE_SETTINGS
from apps.content.models import ContentItem, SiteSetting


def serialize_content(item: ContentItem, request=None) -> dict:
    image_url = item.image_url
    # An uploaded file's URL (e.g. "/media/content/photo.jpg") is relative to
    # whatever domain serves it. The frontend and backend are on completely
    # different domains, so rendering it as-is tries to load the image from
    # the frontend's own domain, which has no such route, and 404s. An
    # external image URL (e.g. an Unsplash link) is already absolute and is
    # left untouched here.
    if request is not None and image_url and not image_url.startswith(("http://", "https://")):
        image_url = request.build_absolute_uri(image_url)
    return {
        "id": item.id,
        "type": item.content_type,
        "slug": item.slug,
        "title": item.title,
        "summary": item.summary,
        "body": item.body,
        "category": item.category,
        "imageUrl": image_url,
        "featured": item.featured,
        "metadata": item.metadata,
    }


def published_items(content_type: str, request=None) -> list[dict]:
    """
    Every published item of this content type, straight from the database -
    nothing merged in, nothing implied to exist that doesn't. If an item is
    deleted or unpublished, it is absent from this list, full stop.
    """
    return [
        serialize_content(item, request=request)
        for item in ContentItem.objects.filter(content_type=content_type, status=ContentItem.Status.PUBLISHED)
    ]


def list_content(request, content_type: str):
    return JsonResponse({"results": published_items(content_type, request=request)})


def content_detail(request, content_type: str, slug: str):
    item = ContentItem.objects.filter(
        content_type=content_type,
        slug=slug,
        status=ContentItem.Status.PUBLISHED,
    ).first()
    if not item:
        raise Http404("Content not found")
    return JsonResponse(serialize_content(item, request=request))


def site_payload(request):
    hero = SiteSetting.objects.filter(key="homepage_hero").first()
    summary = SiteSetting.objects.filter(key="site_summary").first()
    base_payload = summary.value if summary else FALLBACK_SITE_SETTINGS
    payload = {
        **base_payload,
        "hero": hero.value if hero else base_payload["hero"],
        "programs": published_items("program", request=request),
        "stories": published_items("story", request=request),
        "campaigns": published_items("campaign", request=request),
        "partners": published_items("partner", request=request),
    }
    return JsonResponse(payload)
