from django.db import models


class MailgunEvent(models.Model):
    event = models.CharField(max_length=120)
    recipient = models.EmailField(blank=True)
    message_id = models.CharField(max_length=255, blank=True)
    signature_valid = models.BooleanField(default=False)
    payload = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.event} {self.recipient}".strip()
