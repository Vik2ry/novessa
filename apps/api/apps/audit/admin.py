from django.contrib import admin

from apps.audit.models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("action", "entity_type", "entity_id", "actor", "created_at")
    list_filter = ("action", "entity_type", "created_at")
    search_fields = ("action", "entity_type", "entity_id", "actor__email", "actor__username")
    readonly_fields = ("actor", "action", "entity_type", "entity_id", "details", "created_at")

    def has_add_permission(self, request):
        return False
