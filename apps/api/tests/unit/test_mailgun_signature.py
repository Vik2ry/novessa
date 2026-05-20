import hmac
from hashlib import sha256

from apps.mailer.views import is_valid_mailgun_signature


def test_mailgun_signature_verification(settings):
    settings.MAILGUN_WEBHOOK_SIGNING_KEY = "secret"
    timestamp = "1710000000"
    token = "token"
    signature = hmac.new(b"secret", f"{timestamp}{token}".encode(), sha256).hexdigest()
    assert is_valid_mailgun_signature(timestamp, token, signature)
    assert not is_valid_mailgun_signature(timestamp, token, "bad")
