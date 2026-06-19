from django.core.management.base import BaseCommand

from apps.core.admin_bootstrap import ensure_admin_user


class Command(BaseCommand):
    help = "Create or repair the deployment admin superuser"

    def handle(self, *args, **options):
        result = ensure_admin_user()

        if result.created:
            self.stdout.write(
                self.style.SUCCESS(f"Created admin superuser: {result.user.username} (ID: {result.user.id})")
            )
            return

        if result.changed_fields:
            changed = ", ".join(result.changed_fields)
            self.stdout.write(self.style.SUCCESS(f"Repaired admin superuser: {result.user.username} ({changed})"))
            return

        self.stdout.write(self.style.SUCCESS(f"Admin superuser is ready: {result.user.username}"))
