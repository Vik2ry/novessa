import traceback
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from apps.content.defaults import FALLBACK_SITE_SETTINGS, FALLBACK_CONTENT
from apps.content.models import ContentItem, SiteSetting


class Command(BaseCommand):
    help = "Seed Novessa starter content and a development superuser."

    def handle(self, *args, **options):
        self.stdout.write("=" * 60)
        self.stdout.write("Starting seed_novessa command")
        self.stdout.write("=" * 60)

        # Step 1: Create admin user
        self.stdout.write("\n[1/3] Creating admin superuser...")
        try:
            User = get_user_model()
            self.stdout.write(f"User model loaded: {User}")
            
            # Check if user exists
            existing_user = User.objects.filter(username="admin").first()
            if existing_user:
                self.stdout.write(self.style.WARNING(f"✓ Admin user already exists (ID: {existing_user.id})"))
            else:
                user = User.objects.create_superuser(
                    username="admin",
                    email="admin@novessafoundation.org.ng",
                    password="ChangeMe123!",
                )
                self.stdout.write(self.style.SUCCESS(f"✓ Created admin superuser (ID: {user.id}, Email: {user.email})"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"✗ Error creating admin user: {e}"))
            self.stdout.write(self.style.ERROR(traceback.format_exc()))

        # Step 2: Seed site settings
        self.stdout.write("\n[2/3] Seeding site settings...")
        try:
            SiteSetting.objects.update_or_create(
                key="homepage_hero",
                defaults={"label": "Homepage hero", "value": FALLBACK_SITE_SETTINGS.get("hero", {})},
            )
            SiteSetting.objects.update_or_create(
                key="site_summary",
                defaults={"label": "Site summary", "value": FALLBACK_SITE_SETTINGS},
            )
            self.stdout.write(self.style.SUCCESS("✓ Seeded site settings"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"✗ Error seeding site settings: {e}"))
            self.stdout.write(self.style.ERROR(traceback.format_exc()))

        # Step 3: Seed content items
        self.stdout.write("\n[3/3] Seeding content items...")
        try:
            total_items = 0
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
                    total_items += 1
            self.stdout.write(self.style.SUCCESS(f"✓ Seeded {total_items} content items"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"✗ Error seeding content: {e}"))
            self.stdout.write(self.style.ERROR(traceback.format_exc()))

        self.stdout.write("\n" + "=" * 60)
        self.stdout.write(self.style.SUCCESS("✓ Seeded Novessa starter data"))
        self.stdout.write("=" * 60)
