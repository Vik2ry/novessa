from django.db import models


class ContentItem(models.Model):
    class ContentType(models.TextChoices):
        PAGE = "page", "Page"
        PROGRAM = "program", "Program"
        STORY = "story", "Impact story"
        CAMPAIGN = "campaign", "Campaign"
        PARTNER = "partner", "Partner"
        EVENT = "event", "Event"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        ARCHIVED = "archived", "Archived"

    content_type = models.CharField(max_length=40, choices=ContentType.choices, db_index=True)
    slug = models.SlugField(max_length=180)
    title = models.CharField(max_length=255)
    summary = models.TextField(blank=True)
    body = models.TextField(blank=True)
    category = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="content/", blank=True)
    external_image_url = models.URLField(blank=True)
    status = models.CharField(max_length=40, choices=Status.choices, default=Status.DRAFT, db_index=True)
    featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=100)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["content_type", "sort_order", "-created_at"]
        constraints = [models.UniqueConstraint(fields=["content_type", "slug"], name="unique_content_type_slug")]

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.featured:
            # Only one item per content type can be featured at a time - saving
            # this one as featured automatically un-features whichever other
            # item of the same type held it before, so "featured" always means
            # "most recently marked featured", not "first by sort order".
            ContentItem.objects.filter(content_type=self.content_type, featured=True).exclude(pk=self.pk).update(
                featured=False
            )

    @property
    def image_url(self) -> str:
        if self.image:
            return self.image.url
        return self.external_image_url


class SiteSetting(models.Model):
    key = models.SlugField(max_length=120, unique=True)
    label = models.CharField(max_length=160)
    value = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["key"]

    def __str__(self) -> str:
        return self.label
