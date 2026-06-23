# PythonAnywhere Deployment Guide

This deploys the Django backend at `https://novessa.pythonanywhere.com` using the PythonAnywhere username `novessa`.

SQLite is configured as the default production database for this deployment. It is fine for a small admin-backed site with light traffic. Move to PythonAnywhere MySQL or another managed database if donation traffic, admin edits, or webhook volume becomes high.

## Paths

- Repo path: `/home/novessa/novessa`
- Django app path: `/home/novessa/novessa/apps/api`
- Virtualenv: `/home/novessa/.virtualenvs/novessa-venv`
- WSGI file: `/var/www/novessa_pythonanywhere_com_wsgi.py`
- Static files path: `/home/novessa/novessa/apps/api/staticfiles`
- Media files path: `/home/novessa/novessa/apps/api/media`
- SQLite database: `/home/novessa/novessa/apps/api/db.sqlite3`

## 1. Clone And Install

Open a PythonAnywhere Bash console:

```bash
cd /home/novessa
git clone <your-github-repo-url> novessa
mkvirtualenv --python=/usr/bin/python3.12 novessa-venv
cd /home/novessa/novessa/apps/api
pip install -r requirements.txt
```

If Python 3.12 is not available on your account, choose the newest Python version listed by PythonAnywhere and use the same version when creating the web app.

## 2. Configure Environment

Create the production env file:

```bash
cd /home/novessa/novessa1/apps/api
cp .env.pythonanywhere.example .env
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
nano .env
```

Set a real `SECRET_KEY`, a strong `ADMIN_PASSWORD`, and any live Paystack/Mailgun/email secrets.

Minimum required values:

```env
DJANGO_SETTINGS_MODULE=config.settings.production
SECRET_KEY=<generated-secret>
DEBUG=False
ALLOWED_HOSTS=novessa.pythonanywhere.com
CSRF_TRUSTED_ORIGINS=https://novessa.pythonanywhere.com
CORS_ALLOWED_ORIGINS=https://novessa.pythonanywhere.com
FRONTEND_URL=https://novessa.pythonanywhere.com
DATABASE_URL=sqlite:////home/novessa/novessa1/apps/api/db.sqlite3
ADMIN_USERNAME=admin
ADMIN_EMAIL=segunbanji@gmail.com
ADMIN_PASSWORD=<strong-password>
```

## 3. Prepare Database And Static Files

Run:

```bash
cd /home/novessa/novessa1/apps/api
python manage.py migrate
python manage.py seed_novessa
python manage.py create_admin
python manage.py collectstatic --noinput
python manage.py check --deploy
```

`seed_novessa` creates starter content and the default `admin` user. `create_admin` then ensures the deployed admin email/password from `.env` are correct.

## 4. Create The Web App

In PythonAnywhere:

1. Open the **Web** tab.
2. Add a new web app for `novessa.pythonanywhere.com`.
3. Choose **Manual configuration**.
4. Choose the same Python version used for the virtualenv.
5. Set **Virtualenv** to `/home/novessa/.virtualenvs/novessa-venv`.
6. Set **Source code** and **Working directory** to `/home/novessa/novessa1/apps/api`.

## 5. Configure The WSGI File

Open the WSGI file link in the Web tab:

```text
/var/www/novessa_pythonanywhere_com_wsgi.py
```

Replace its contents with the contents of `/home/novessa/novessa1/pythonanywhere_wsgi.py`.

The important values are:

```python
API_ROOT = "/home/novessa/novessa1/apps/api"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")
```

## 6. Configure Static And Media Files

In the Web tab, add static file mappings:

```text
URL: /static/
Directory: /home/novessa/novessa1/apps/api/staticfiles
```

Optional, if uploads/media are used:

```text
URL: /media/
Directory: /home/novessa/novessa1/apps/api/media
```

Click **Reload** for the web app.

## 7. Verify

Open:

```text
https://novessa.pythonanywhere.com/api/v1/health/
https://novessa.pythonanywhere.com/admin/
```

Sign in to Django Admin with:

```text
username: admin
password: the ADMIN_PASSWORD value from /home/novessa/novessa/apps/api/.env
```

If the page errors, check the error log link in the PythonAnywhere Web tab.

## Updating Later

```bash
cd /home/novessa/novessa1
git pull
workon novessa-venv
cd /home/novessa/novessa1/apps/api
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py create_admin
```

Then reload the web app from the PythonAnywhere Web tab.
