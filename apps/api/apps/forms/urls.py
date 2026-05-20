from django.urls import path

from apps.forms import views

urlpatterns = [
    path("volunteer/", views.volunteer, name="volunteer"),
    path("contact/", views.contact, name="contact"),
    path("newsletter/", views.newsletter, name="newsletter"),
    path("partner/", views.partner, name="partner"),
]
