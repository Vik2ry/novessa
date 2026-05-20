from django.urls import path

from apps.mailer import views

urlpatterns = [path("webhooks/mailgun/", views.mailgun_webhook, name="mailgun-webhook")]
