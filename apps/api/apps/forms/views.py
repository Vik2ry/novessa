import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from apps.forms.models import ContactMessage, NewsletterSubscription, PartnerInquiry, VolunteerApplication
from apps.mailer.services import MailgunEmailService


@csrf_exempt
@require_POST
def volunteer(request):
    payload = json.loads(request.body.decode("utf-8") or "{}")
    application = VolunteerApplication.objects.create(
        full_name=payload["fullName"],
        email=payload["email"],
        phone=payload.get("phone", ""),
        role_interest=payload.get("roleInterest", ""),
        location=payload.get("location", ""),
        availability=payload.get("availability", []),
        message=payload.get("message", ""),
    )
    MailgunEmailService.volunteer_confirmation(application.email, application.full_name)
    return JsonResponse({"id": application.id, "message": "Volunteer application received"}, status=201)


@csrf_exempt
@require_POST
def contact(request):
    payload = json.loads(request.body.decode("utf-8") or "{}")
    message = ContactMessage.objects.create(
        full_name=payload["fullName"],
        email=payload["email"],
        subject=payload["subject"],
        message=payload["message"],
    )
    return JsonResponse({"id": message.id, "message": "Message received"}, status=201)


@csrf_exempt
@require_POST
def newsletter(request):
    payload = json.loads(request.body.decode("utf-8") or "{}")
    subscription, created = NewsletterSubscription.objects.get_or_create(
        email=payload["email"],
        defaults={"source": payload.get("source", "website"), "preferences": payload.get("preferences", {})},
    )
    return JsonResponse(
        {"id": subscription.id, "message": "Subscription confirmed" if created else "Already subscribed"},
        status=201,
    )


@csrf_exempt
@require_POST
def partner(request):
    payload = json.loads(request.body.decode("utf-8") or "{}")
    inquiry = PartnerInquiry.objects.create(
        organization_name=payload["organizationName"],
        contact_name=payload["contactName"],
        email=payload["email"],
        industry=payload.get("industry", ""),
        collaboration_interest=payload.get("collaborationInterest", ""),
        message=payload.get("message", ""),
        metadata=payload.get("metadata", {}),
    )
    return JsonResponse({"id": inquiry.id, "message": "Partner inquiry received"}, status=201)
