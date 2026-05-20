from django.urls import path

from apps.donations import views

urlpatterns = [
    path("", views.create_donation, name="donation-create"),
    path("<str:reference>/", views.donation_detail, name="donation-detail"),
    path("webhooks/paystack/", views.paystack_webhook, name="paystack-webhook"),
]
