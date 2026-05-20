from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

urlpatterns = [
    path("", RedirectView.as_view(url="/admin/", permanent=False)),
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.core.urls")),
    path("api/v1/content/", include("apps.content.urls")),
    path("api/v1/donations/", include("apps.donations.urls")),
    path("api/v1/forms/", include("apps.forms.urls")),
    path("api/v1/mailer/", include("apps.mailer.urls")),
]
