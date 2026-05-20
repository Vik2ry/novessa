from django.contrib import admin

from apps.content.models import ContentItem, SiteSetting


@admin.register(ContentItem)
class ContentItemAdmin(admin.ModelAdmin):
    list_display = ("title", "content_type", "status", "featured", "sort_order", "updated_at")
    list_filter = ("content_type", "status", "featured", "category")
    search_fields = ("title", "summary", "body", "slug")
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ("status", "featured", "sort_order")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Publishing", {"fields": ("content_type", "status", "featured", "sort_order")}),
        ("Content", {"fields": ("title", "slug", "summary", "body", "category")}),
        ("Media", {"fields": ("image", "external_image_url")}),
        ("Structured metadata", {"fields": ("metadata",)}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ("key", "label", "updated_at")
    search_fields = ("key", "label")
