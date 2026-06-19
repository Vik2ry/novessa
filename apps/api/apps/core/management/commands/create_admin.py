import logging
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Create admin superuser if it doesn't exist"

    def handle(self, *args, **options):
        User = get_user_model()
        
        if User.objects.filter(username="admin").exists():
            self.stdout.write(self.style.SUCCESS("✓ Admin user already exists"))
            return
        
        try:
            user = User.objects.create_superuser(
                username="admin",
                email="admin@novessa.org",
                password="ChangeMe123!",
            )
            self.stdout.write(
                self.style.SUCCESS(f"✓ Created admin superuser: {user.username} (ID: {user.id})")
            )
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"✗ Failed to create admin user: {str(e)}"))
            logger.error(f"Failed to create admin user: {str(e)}", exc_info=True)
            raise
