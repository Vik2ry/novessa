from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.core"

    def ready(self):
        """Configure admin site on app ready."""
        from django.conf import settings
        from django.contrib import admin
        
        admin.site.site_header = settings.ADMIN_SITE_HEADER
        admin.site.site_title = settings.ADMIN_SITE_TITLE
        admin.site.index_title = settings.ADMIN_INDEX_TITLE
