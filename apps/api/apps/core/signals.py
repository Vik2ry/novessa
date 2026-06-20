import logging
from django.apps import apps
from django.db.models.signals import post_migrate
from django.dispatch import receiver

logger = logging.getLogger(__name__)


@receiver(post_migrate)
def create_admin_user(sender, **kwargs):
    """Create admin user after migrations run on first startup."""
    try:
        # Only run for the auth app migrations
        if sender.name != 'django.contrib.auth':
            return
        
        from django.contrib.auth import get_user_model
        
        User = get_user_model()
        
        # Check if admin user already exists
        if User.objects.filter(username="admin").exists():
            logger.info("✓ Admin user already exists")
            return
        
        # Create the admin superuser
        user = User.objects.create_superuser(
            username="admin",
            email="admin@novessafoundation.org.ng",
            password="ChangeMe123!",
        )
        logger.info(f"✓ Created admin superuser: {user.username} (ID: {user.id})")
        
    except Exception as e:
        logger.error(f"✗ Failed to create admin user: {str(e)}", exc_info=True)
