from django.contrib import admin

from apps.forms.models import ContactMessage, NewsletterSubscription, PartnerInquiry, VolunteerApplication


@admin.register(VolunteerApplication)
class VolunteerApplicationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "role_interest", "location", "status", "created_at")
    list_filter = ("status", "role_interest", "created_at")
    search_fields = ("full_name", "email", "phone", "location", "message")
    list_editable = ("status",)
    readonly_fields = ("created_at", "updated_at")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("subject", "full_name", "email", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("subject", "full_name", "email", "message")
    list_editable = ("status",)
    readonly_fields = ("created_at",)


@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ("email", "source", "created_at")
    search_fields = ("email", "source")
    readonly_fields = ("created_at",)


@admin.register(PartnerInquiry)
class PartnerInquiryAdmin(admin.ModelAdmin):
    list_display = ("organization_name", "contact_name", "email", "industry", "status", "created_at")
    list_filter = ("status", "industry", "created_at")
    search_fields = ("organization_name", "contact_name", "email", "collaboration_interest", "message")
    list_editable = ("status",)
    readonly_fields = ("created_at",)
