from django import forms
from django.contrib import admin
from django.utils.safestring import mark_safe

from apps.content.models import ContentItem, SiteSetting


class RichTextWidget(forms.Textarea):
    """
    A WYSIWYG editor for the `body` field, so the writer can paste formatted
    content straight from a Google Doc (bold, headings, links, lists) and have
    it stored as HTML. No new pip dependency: Quill is loaded from a CDN via
    Django's widget Media mechanism, and the underlying <textarea> stays in
    the DOM (hidden) so the form still submits normally — Quill's HTML output
    is copied into it on every edit and right before submit.

    The frontend sanitizes this HTML before rendering (see apps/web/lib/sanitize.ts)
    so paste-cruft or disallowed tags never reach the live site.
    """

    class Media:
        css = {"all": ("https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css",)}
        js = ("https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js",)

    def render(self, name, value, attrs=None, renderer=None):
        textarea_html = super().render(name, value, attrs, renderer)
        final_attrs = self.build_attrs(self.attrs, attrs)
        widget_id = final_attrs.get("id", f"id_{name}")
        editor_id = f"{widget_id}_quill_editor"
        initial_html = (value or "").replace("</script>", "<\\/script>")

        return mark_safe(f"""
            <div class="richtext-widget">
              <style>
                /* Django Admin's dark theme sets a light --body-fg color meant for dark
                   backgrounds elsewhere in the admin. This editor surface is deliberately
                   kept white regardless of the browser/OS theme, so text color must be
                   forced too, or it inherits that light color and becomes unreadable. */
                .richtext-editor-surface,
                .richtext-editor-surface .ql-editor {{
                  color: #1a1a1a !important;
                }}
                .richtext-editor-surface .ql-editor.ql-blank::before {{
                  color: #6b7280 !important;
                  font-style: normal !important;
                }}
              </style>
              <div id="{editor_id}" class="richtext-editor-surface"
                   style="background:#fff;min-height:220px;"></div>
              <div style="display:none;">{textarea_html}</div>
            </div>
            <script>
            (function() {{
              function init() {{
                var sourceField = document.getElementById("{widget_id}");
                var quill = new Quill("#{editor_id}", {{ theme: "snow" }});
                quill.root.innerHTML = {initial_html!r};
                function sync() {{ sourceField.value = quill.root.innerHTML; }}
                quill.on("text-change", sync);
                var form = sourceField.closest("form");
                if (form) {{ form.addEventListener("submit", sync); }}
              }}
              if (document.readyState === "loading") {{
                document.addEventListener("DOMContentLoaded", init);
              }} else {{
                init();
              }}
            }})();
            </script>
            """)


@admin.register(ContentItem)
class ContentItemAdmin(admin.ModelAdmin):
    list_display = ("title", "content_type", "status", "featured", "sort_order", "updated_at")
    list_filter = ("content_type", "status", "featured", "category")
    search_fields = ("title", "summary", "body", "slug")
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ("status", "featured", "sort_order")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            "Publishing",
            {
                "fields": ("content_type", "status", "featured", "sort_order"),
                "description": (
                    "Only one item per content type can be Featured at a time - checking it "
                    "here automatically un-features whichever other item of the same type "
                    "had it before."
                ),
            },
        ),
        (
            "Content",
            {
                "fields": ("title", "slug", "summary", "body", "category"),
                "description": (
                    "Summary must stay plain text (it's reused in page meta descriptions, "
                    "which can't contain HTML). Body supports rich formatting — paste "
                    "directly from a Google Doc and it keeps bold/headings/links/lists."
                ),
            },
        ),
        ("Media", {"fields": ("image", "external_image_url")}),
        ("Structured metadata", {"fields": ("metadata",)}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name == "body":
            kwargs["widget"] = RichTextWidget
        return super().formfield_for_dbfield(db_field, request, **kwargs)

    def save_model(self, request, obj, form, change):
        previously_featured = None
        if obj.featured:
            previously_featured = (
                ContentItem.objects.filter(content_type=obj.content_type, featured=True).exclude(pk=obj.pk).first()
            )
        super().save_model(request, obj, form, change)
        if previously_featured:
            self.message_user(
                request,
                f'"{previously_featured.title}" was automatically un-featured, since only one '
                f"{obj.get_content_type_display()} can be featured at a time.",
            )


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ("key", "label", "updated_at")
    search_fields = ("key", "label")
