from django.contrib import admin

from apps.donations.models import Donation, PaymentWebhookEvent


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ("reference", "donor_email", "amount_display", "provider", "status", "campaign_slug", "created_at")
    list_filter = ("provider", "status", "currency", "campaign_slug")
    search_fields = ("reference", "provider_reference", "donor_email", "donor_name")
    readonly_fields = ("reference", "provider_reference", "checkout_url", "created_at", "updated_at")
    list_editable = ("status",)


@admin.register(PaymentWebhookEvent)
class PaymentWebhookEventAdmin(admin.ModelAdmin):
    list_display = ("provider", "event_type", "signature_valid", "processed", "donation", "created_at")
    list_filter = ("provider", "event_type", "signature_valid", "processed")
    search_fields = ("event_id", "donation__reference", "error")
    readonly_fields = (
        "provider",
        "event_type",
        "event_id",
        "signature_valid",
        "processed",
        "payload",
        "error",
        "donation",
        "created_at",
    )

    def has_add_permission(self, request):
        return False
