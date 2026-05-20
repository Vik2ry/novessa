import uuid

from django.db import models


def make_reference() -> str:
    return f"novessa_{uuid.uuid4().hex[:18]}"


class Donation(models.Model):
    class Provider(models.TextChoices):
        PAYSTACK = "paystack", "Paystack"
        STRIPE = "stripe", "Stripe"
        PAYPAL = "paypal", "PayPal"
        BANK = "bank", "Bank transfer"

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        COMPLETED = "completed", "Completed"
        FAILED = "failed", "Failed"
        REFUNDED = "refunded", "Refunded"

    reference = models.CharField(max_length=80, unique=True, default=make_reference)
    provider = models.CharField(max_length=40, choices=Provider.choices, default=Provider.PAYSTACK)
    provider_reference = models.CharField(max_length=120, blank=True, db_index=True)
    donor_name = models.CharField(max_length=255, blank=True)
    donor_email = models.EmailField()
    amount_minor = models.PositiveIntegerField()
    currency = models.CharField(max_length=8, default="NGN")
    campaign_slug = models.SlugField(max_length=180, default="community-care-fund")
    status = models.CharField(max_length=40, choices=Status.choices, default=Status.PENDING, db_index=True)
    checkout_url = models.URLField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["status", "created_at"])]

    def __str__(self) -> str:
        return f"{self.reference} - {self.get_status_display()}"

    @property
    def amount_display(self) -> str:
        return f"{self.currency} {self.amount_minor / 100:,.2f}"


class PaymentWebhookEvent(models.Model):
    provider = models.CharField(max_length=40)
    event_type = models.CharField(max_length=120)
    event_id = models.CharField(max_length=180, blank=True)
    signature_valid = models.BooleanField(default=False)
    processed = models.BooleanField(default=False)
    payload = models.JSONField(default=dict, blank=True)
    error = models.TextField(blank=True)
    donation = models.ForeignKey(Donation, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["provider", "event_type"])]

    def __str__(self) -> str:
        return f"{self.provider}:{self.event_type}"
