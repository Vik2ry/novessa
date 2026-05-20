from django.db import models


class VolunteerApplication(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        REVIEWING = "reviewing", "Reviewing"
        ACCEPTED = "accepted", "Accepted"
        DECLINED = "declined", "Declined"

    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=80, blank=True)
    role_interest = models.CharField(max_length=160, blank=True)
    location = models.CharField(max_length=160, blank=True)
    availability = models.JSONField(default=list, blank=True)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=40, choices=Status.choices, default=Status.NEW)
    staff_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.full_name


class ContactMessage(models.Model):
    class Status(models.TextChoices):
        UNREAD = "unread", "Unread"
        READ = "read", "Read"
        RESOLVED = "resolved", "Resolved"

    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=40, choices=Status.choices, default=Status.UNREAD)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.subject


class NewsletterSubscription(models.Model):
    email = models.EmailField(unique=True)
    source = models.CharField(max_length=80, default="website")
    preferences = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.email


class PartnerInquiry(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        REVIEWING = "reviewing", "Reviewing"
        RESPONDED = "responded", "Responded"
        ARCHIVED = "archived", "Archived"

    organization_name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255)
    email = models.EmailField()
    industry = models.CharField(max_length=160, blank=True)
    collaboration_interest = models.CharField(max_length=255, blank=True)
    message = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    status = models.CharField(max_length=40, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.organization_name
