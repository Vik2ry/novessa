from django.contrib import admin

from apps.mailer.models import MailgunEvent


@admin.register(MailgunEvent)
class MailgunEventAdmin(admin.ModelAdmin):
    list_display = ("event", "recipient", "signature_valid", "created_at")
    list_filter = ("event", "signature_valid", "created_at")
    search_fields = ("recipient", "message_id")
    readonly_fields = ("event", "recipient", "message_id", "signature_valid", "payload", "created_at")

    def has_add_permission(self, request):
        return False
