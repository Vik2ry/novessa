from django.urls import path

from apps.content import views

urlpatterns = [
    path("site/", views.site_payload, name="site-payload"),
    path("<str:content_type>/", views.list_content, name="content-list"),
    path("<str:content_type>/<slug:slug>/", views.content_detail, name="content-detail"),
]
