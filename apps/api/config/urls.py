from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

# Configure admin site
if hasattr(settings, 'ADMIN_SITE_HEADER'):
    admin.site.site_header = settings.ADMIN_SITE_HEADER
if hasattr(settings, 'ADMIN_SITE_TITLE'):
    admin.site.site_title = settings.ADMIN_SITE_TITLE
if hasattr(settings, 'ADMIN_INDEX_TITLE'):
    admin.site.index_title = settings.ADMIN_INDEX_TITLE

urlpatterns = [
    path("", RedirectView.as_view(url="/admin/", permanent=False)),
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.core.urls")),
    path("api/v1/content/", include("apps.content.urls")),
    path("api/v1/donations/", include("apps.donations.urls")),
    path("api/v1/forms/", include("apps.forms.urls")),
    path("api/v1/mailer/", include("apps.mailer.urls")),
]
