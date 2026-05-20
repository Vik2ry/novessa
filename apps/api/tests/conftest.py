import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.test")
os.environ.setdefault("SECRET_KEY", "test-secret-key")
os.environ.setdefault("PAYSTACK_SECRET_KEY", "test_paystack_secret")
os.environ.setdefault("MAILGUN_WEBHOOK_SIGNING_KEY", "test_mailgun_signing_key")

import django

django.setup()
