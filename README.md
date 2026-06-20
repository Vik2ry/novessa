# Novessa Foundation Platform

Production-ready monorepo for the Novessa Foundation website and operations backend.

- `apps/web`: Next.js public website designed from the Novessa design pack.
- `apps/api`: Django backend with Django Admin CRUD, public JSON endpoints, donations, Paystack webhooks, Mailgun email notifications, and audit/event records.

## Local Setup

### 1. Install dependencies

```bash
npm install
cd apps/api
python -m pip install -r requirements-dev.txt
```

### 2. Create backend environment file

Copy `apps/api/.env.example` to `apps/api/.env`.

Generate a Django secret:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Set:

```env
SECRET_KEY=<the generated secret>
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
FRONTEND_URL=http://localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Get Paystack variables

1. Create or log into a Paystack account.
2. Open **Settings → API Keys & Webhooks**.
3. Copy the test public key into `PAYSTACK_PUBLIC_KEY`.
4. Copy the test secret key into `PAYSTACK_SECRET_KEY`.
5. For local webhook testing, use a tunnel such as `ngrok http 8000`, then add:

```text
https://<your-tunnel>/api/v1/donations/webhooks/paystack/
```

For production on Render, use:

```text
https://api.novessafoundation.org.ng/api/v1/donations/webhooks/paystack/
```

### 4. Get Mailgun variables

Mailgun is implemented directly through the Mailgun Messages API, not MessagePipe. The app sends rendered message content to Mailgun with optional tags and variables. There are no MessagePipe template IDs in this codebase.

1. Create or log into Mailgun.
2. Add a sending domain, ideally `mg.novessafoundation.org.ng`.
3. Add the DNS records Mailgun gives you at your domain registrar.
4. Copy your private API key into `MAILGUN_API_KEY`.
5. Set `MAILGUN_DOMAIN=mg.novessafoundation.org.ng`.
6. Set `MAILGUN_FROM_EMAIL=Novessa Foundation <hello@novessafoundation.org.ng>`.
7. In Mailgun webhook settings, copy the HTTP webhook signing key into `MAILGUN_WEBHOOK_SIGNING_KEY`.
8. Add the production webhook URL:

```text
https://api.novessafoundation.org.ng/api/v1/mailer/webhooks/mailgun/
```

### 5. Create frontend environment file

Copy `apps/web/.env.example` to `apps/web/.env.local`.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Run Locally

Backend:

```bash
cd apps/api
python manage.py migrate
python manage.py seed_novessa
python manage.py runserver 8000
```

Admin login after seeding:

```text
http://localhost:8000/admin/
username: admin
password: ChangeMe123!
```

Frontend:

```bash
npm run dev:web
```

Open `http://localhost:3000`.

## Quality Checks

Backend:

```bash
cd apps/api
black --check .
ruff check .
pytest --cov=apps --cov-report=term-missing
DJANGO_SETTINGS_MODULE=config.settings.production SECRET_KEY=<long-secret> ALLOWED_HOSTS=api.novessafoundation.org.ng CSRF_TRUSTED_ORIGINS=https://novessafoundation.org.ng CORS_ALLOWED_ORIGINS=https://novessafoundation.org.ng python manage.py check --deploy
```

Frontend:

```bash
npm run lint:web
npm run typecheck:web
npm run build:web
```

## Deployment: Cost-Effective Path

### Backend on Render

1. Push the repo to GitHub.
2. In Render, create a PostgreSQL database. The free plan is fine for early launch; move to the lowest paid plan before serious donor traffic.
3. Create a Web Service from the same repo.
4. Set root directory to `apps/api`.
5. Build command:

```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

6. Start command:

```bash
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 3
```

7. Set environment variables:

```env
DJANGO_SETTINGS_MODULE=config.settings.production
SECRET_KEY=<Render generated secret>
DEBUG=False
DATABASE_URL=<Render PostgreSQL internal database URL>
ALLOWED_HOSTS=api.novessafoundation.org.ng,<your-render-service>.onrender.com
CSRF_TRUSTED_ORIGINS=https://novessafoundation.org.ng,https://www.novessafoundation.org.ng,https://api.novessafoundation.org.ng
CORS_ALLOWED_ORIGINS=https://novessafoundation.org.ng,https://www.novessafoundation.org.ng
FRONTEND_URL=https://novessafoundation.org.ng
PAYSTACK_PUBLIC_KEY=<live public key>
PAYSTACK_SECRET_KEY=<live secret key>
MAILGUN_API_KEY=<private api key>
MAILGUN_DOMAIN=mg.novessafoundation.org.ng
MAILGUN_FROM_EMAIL=Novessa Foundation <hello@novessafoundation.org.ng>
MAILGUN_WEBHOOK_SIGNING_KEY=<mailgun signing key>
```

8. Add a custom domain in Render: `api.novessafoundation.org.ng`.
9. Add the DNS record Render gives you at your registrar.
10. Run `python manage.py createsuperuser` from Render Shell for the real admin account.

### Frontend on Vercel

1. Import the GitHub repo into Vercel.
2. Set **Root Directory** to `apps/web`.
3. Set environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.novessafoundation.org.ng/api/v1
NEXT_PUBLIC_SITE_URL=https://novessafoundation.org.ng
```

4. Deploy.
5. Open **Project Settings → Domains**.
6. Add `novessafoundation.org.ng` and `www.novessafoundation.org.ng`.
7. At your DNS provider, add the Vercel records shown for the apex and `www` domain.
8. Make `novessafoundation.org.ng` the primary domain so visitors do not see `novessa.vercel.app`.

## Production Notes

- Use Paystack live keys only after test donations and webhook verification pass.
- Keep Django Admin behind strong passwords and staff-only accounts.
- Use `mg.novessafoundation.org.ng` for Mailgun sending to protect the root domain reputation.
- Start on free/low-cost Render and Vercel plans, then upgrade only when traffic, email volume, or database limits require it.
- Keep all content edits inside Django Admin: programs, stories, campaigns, partners, forms, donations, Mailgun events, and webhook logs.

