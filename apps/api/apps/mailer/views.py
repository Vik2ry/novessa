import hmac
from hashlib import sha256

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from apps.mailer.models import MailgunEvent


def is_valid_mailgun_signature(timestamp: str, token: str, signature: str) -> bool:
    if not settings.MAILGUN_WEBHOOK_SIGNING_KEY:
        return False
    digest = hmac.new(
        key=settings.MAILGUN_WEBHOOK_SIGNING_KEY.encode(),
        msg=f"{timestamp}{token}".encode(),
        digestmod=sha256,
    ).hexdigest()
    return hmac.compare_digest(digest, signature)


@csrf_exempt
@require_POST
def mailgun_webhook(request):
    payload = request.POST.dict() or {}
    signature_data = payload.get("signature", {})
    if not signature_data and request.content_type == "application/json":
        import json

        payload = json.loads(request.body.decode("utf-8") or "{}")
        signature_data = payload.get("signature", {})
    event_data = payload.get("event-data", {})
    timestamp = str(signature_data.get("timestamp", ""))
    token = str(signature_data.get("token", ""))
    signature = str(signature_data.get("signature", ""))
    valid = is_valid_mailgun_signature(timestamp, token, signature)
    MailgunEvent.objects.create(
        event=str(event_data.get("event", payload.get("event", "unknown"))),
        recipient=str(event_data.get("recipient", payload.get("recipient", ""))),
        message_id=str(event_data.get("message", {}).get("headers", {}).get("message-id", "")),
        signature_valid=valid,
        payload=payload,
    )
    if not valid:
        return JsonResponse({"status": "error", "message": "Invalid signature"}, status=400)
    return JsonResponse({"status": "ok"})
