"""
Copy this file into PythonAnywhere's Web tab WSGI file:
/var/www/novessa_pythonanywhere_com_wsgi.py
"""

import os
import sys

API_ROOT = "/home/novessa/novessa/apps/api"

if API_ROOT not in sys.path:
    sys.path.insert(0, API_ROOT)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
