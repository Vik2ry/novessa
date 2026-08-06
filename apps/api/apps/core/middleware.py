from django.conf import settings
from django.http import HttpResponse


class SimpleCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        origin = request.headers.get("origin")
        is_allowed_origin = origin in settings.CORS_ALLOWED_ORIGINS

        # Browsers send an OPTIONS preflight before the real cross-origin POST
        # and require a *successful* response to it. Every form endpoint is
        # @require_POST, which rejects OPTIONS with 405 before this middleware
        # got a chance to respond - so preflights must be answered here,
        # before calling get_response(), not after.
        if request.method == "OPTIONS" and is_allowed_origin:
            response = HttpResponse(status=204)
        else:
            response = self.get_response(request)

        if is_allowed_origin:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Credentials"] = "true"
            response["Access-Control-Allow-Headers"] = "content-type, authorization, x-paystack-signature"
            response["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS"
        return response
