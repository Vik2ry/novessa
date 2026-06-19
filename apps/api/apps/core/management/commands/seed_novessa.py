from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from apps.content.defaults import FALLBACK_SITE_SETTINGS, FALLBACK_CONTENT
from apps.content.models import ContentItem, SiteSetting


class Command(BaseCommand):
    help = "Seed Novessa starter content and a development superuser."

    def handle(self, *args, **options):
        try:
            User = get_user_model()
            if not User.objects.filter(username="admin").exists():
                User.objects.create_superuser(
                    username="admin",
                    email="admin@novessa.org",
                    password="ChangeMe123!",
                )
                self.stdout.write(self.style.SUCCESS("Created admin superuser."))
            else:
                self.stdout.write(self.style.WARNING("Admin user already exists."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error creating admin user: {e}"))

        try:
            SiteSetting.objects.update_or_create(
                key="homepage_hero",
                defaults={"label": "Homepage hero", "value": FALLBACK_SITE_SETTINGS["hero"]},
            )
            SiteSetting.objects.update_or_create(
                key="site_summary",
                defaults={"label": "Site summary", "value": FALLBACK_SITE_SETTINGS},
            )
            self.stdout.write(self.style.SUCCESS("Seeded site settings."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error seeding site settings: {e}"))

        try:
            for content_type, items in FALLBACK_CONTENT.items():
                for index, item in enumerate(items, start=1):
                    ContentItem.objects.update_or_create(
                        content_type=content_type,
                        slug=item["slug"],
                        defaults={
                            "title": item["title"],
                            "summary": item["summary"],
                            "body": item["body"],
                            "category": item["category"],
                            "external_image_url": item["imageUrl"],
                            "featured": item.get("featured", False),
                            "metadata": item.get("metadata", {}),
                            "sort_order": index,
                            "status": "published",
                        },
                    )
            self.stdout.write(self.style.SUCCESS("Seeded content items."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error seeding content: {e}"))

        self.stdout.write(self.style.SUCCESS("Seeded Novessa starter data."))
