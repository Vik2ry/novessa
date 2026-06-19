from pathlib import Path
import os

from environ import Env

BASE_DIR = Path(__file__).resolve().parents[2]
PROJECT_ROOT = BASE_DIR.parent

env = Env(
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ["localhost", "127.0.0.1"]),
    CSRF_TRUSTED_ORIGINS=(list, ["http://localhost:3000"]),
    EMAIL_PORT=(int, 587),
    EMAIL_USE_TLS=(bool, True),
)

for env_file in (BASE_DIR / ".env", PROJECT_ROOT / ".env"):
    if env_file.exists():
        Env.read_env(env_file)
        break

SECRET_KEY = env("SECRET_KEY", default="dev-only-change-me-in-production")
DEBUG = env("DEBUG")

# Parse ALLOWED_HOSTS and add Render domain if running on Render
_allowed_hosts = env("ALLOWED_HOSTS")
ALLOWED_HOSTS = _allowed_hosts

# If running on Render (HOST environment variable is set), add it
if os.environ.get("RENDER"):
    render_external_url = os.environ.get("RENDER_EXTERNAL_URL", "")
    if render_external_url:
        # Extract just the hostname from the URL
        render_host = render_external_url.replace("https://", "").replace("http://", "").rstrip("/")
        if render_host and render_host not in ALLOWED_HOSTS:
            ALLOWED_HOSTS = list(ALLOWED_HOSTS) + [render_host]

CSRF_TRUSTED_ORIGINS = env("CSRF_TRUSTED_ORIGINS")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "apps.core",
    "apps.audit",
    "apps.content",
    "apps.donations",
    "apps.forms",
    "apps.mailer",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "apps.core.middleware.SimpleCorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Lagos"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

FRONTEND_URL = env("FRONTEND_URL", default="http://localhost:3000")
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=["http://localhost:3000"])

PAYSTACK_PUBLIC_KEY = env("PAYSTACK_PUBLIC_KEY", default="")
PAYSTACK_SECRET_KEY = env("PAYSTACK_SECRET_KEY", default="")
PAYSTACK_BASE_URL = env("PAYSTACK_BASE_URL", default="https://api.paystack.co")

MAILGUN_API_KEY = env("MAILGUN_API_KEY", default="")
MAILGUN_DOMAIN = env("MAILGUN_DOMAIN", default="")
MAILGUN_BASE_URL = env("MAILGUN_BASE_URL", default="https://api.mailgun.net/v3")
MAILGUN_FROM_EMAIL = env("MAILGUN_FROM_EMAIL", default="Novessa Foundation <hello@novessa.org>")
MAILGUN_WEBHOOK_SIGNING_KEY = env("MAILGUN_WEBHOOK_SIGNING_KEY", default="")
EMAIL_LOG_TO_CONSOLE = env.bool("EMAIL_LOG_TO_CONSOLE", default=True)

EMAIL_BACKEND = env("EMAIL_BACKEND", default="django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = env("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_USE_TLS = env("EMAIL_USE_TLS")
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default=env("MAIL_USERNAME", default=""))
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default=env("MAIL_PASSWORD", default=""))
DEFAULT_FROM_EMAIL = env(
    "DEFAULT_FROM_EMAIL",
    default=env("MAIL_FROM_EMAIL", default="Novessa Foundation <hello@novessa.org>"),
)

ADMIN_SITE_HEADER = "Novessa Foundation Admin"
ADMIN_SITE_TITLE = "Novessa Admin"
ADMIN_INDEX_TITLE = "Content, donations, and community operations"
