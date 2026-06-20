# Render Deployment Checklist for Novessa Backend

## Pre-Deployment (One-time Setup)

### 1. Prepare Render Account
- [ ] Create a Render account at https://render.com
- [ ] Connect your GitHub repository to Render
- [ ] Ensure you have billing configured (free tier available)

### 2. Gather Required Credentials
- [ ] Gmail account (for email sending) with App Password generated
  - Reference: https://myaccount.google.com/apppasswords
- [ ] Paystack account credentials (public & secret keys)
- [ ] Mailgun account credentials (if using advanced email features) - optional
- [ ] Domain name configured (api.novessafoundation.org.ng)

### 3. Infrastructure Review
- [ ] Verify `render.yaml` exists in repository root ✓ (Already configured)
- [ ] Confirm `.python-version` specifies Python 3.12 ✓ (Already configured)
- [ ] Check `requirements.txt` has all dependencies ✓ (Already configured)
- [ ] Verify Dockerfile exists ✓ (Already exists)
- [ ] Confirm production Django settings are optimized ✓ (Already configured)

## Deployment Steps

### Step 1: Create PostgreSQL Database Service
1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Name: `novessa-postgres`
4. Keep default settings (free tier)
5. Click "Create Database"
6. Copy the connection string (you'll need it)

### Step 2: Create Web Service (API)
1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Choose the branch to deploy (main/production)
5. Build command and start command will be auto-detected from `render.yaml`
6. Click "Create Web Service"

### Step 3: Configure Environment Variables
In your API service settings, add these environment variables:

**Email Configuration:**
```
EMAIL_HOST_USER = your-email@gmail.com
EMAIL_HOST_PASSWORD = your-gmail-app-password
```

**Payment Processing:**
```
PAYSTACK_PUBLIC_KEY = pk_live_xxxxx (or pk_test_xxxxx for testing)
PAYSTACK_SECRET_KEY = sk_live_xxxxx (or sk_test_xxxxx for testing)
```

**Optional - Mailgun Integration:**
```
MAILGUN_API_KEY = key-xxxxx
MAILGUN_DOMAIN = mg.novessafoundation.org.ng
MAILGUN_WEBHOOK_SIGNING_KEY = xxxxx
```

**Database Connection:**
- Automatically added by Render when you link the PostgreSQL service

### Step 4: Link PostgreSQL Service
1. Go to your API service in Render
2. Under "Environment" → scroll to "Database"
3. Click "Add PostgreSQL Database"
4. Select `novessa-postgres`
5. Click "Save"

### Step 5: Verify Deployment
1. Wait for build to complete (check logs)
2. Visit health endpoint: `https://novessa-api.onrender.com/api/v1/health/`
3. Should return: `{"status": "ok", "service": "novessa-django-api"}`
4. Check admin panel: `https://novessa-api.onrender.com/admin/`
5. Monitor logs for any errors

## Post-Deployment

### 1. Update Frontend
Update the frontend `NEXT_PUBLIC_API_BASE_URL` environment variable:
```
NEXT_PUBLIC_API_BASE_URL=https://novessa-api.onrender.com/api/v1
```

### 2. Configure Custom Domain
1. In Render, go to your API service
2. Settings → "Custom Domain"
3. Add `api.novessafoundation.org.ng`
4. Update DNS records as instructed by Render
5. Wait for SSL certificate (automatic)

### 3. Monitor Application
- **Logs**: Render dashboard → Service → "Logs" tab
- **Metrics**: Render dashboard → Service → "Metrics" tab
- **Errors**: Check logs if issues occur

### 4. Set Up Alerts (Optional)
- Configure notifications in Render dashboard for deploy failures
- Set up monitoring for slow performance

## Common Issues & Fixes

### ❌ Build Fails
**Solution:**
1. Check Render build logs for specific error
2. Verify all dependencies in `requirements.txt` are compatible
3. Check Python version matches 3.12
4. Run locally: `python -m pip install -r requirements.txt`

### ❌ Database Connection Error
**Solution:**
1. Verify `DATABASE_URL` is linked in Environment
2. Check PostgreSQL service is running in Render
3. Confirm migrations ran: Check logs for "Running migrations"

### ❌ Static Files Not Loading
**Solution:**
1. Verify build completed successfully
2. Check `collectstatic` ran during build (visible in logs)
3. Ensure `STATIC_URL = "/static/"` in settings

### ❌ Email Not Sending
**Solution:**
1. Verify `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` are correct
2. For Gmail: Use App Password, not regular password
3. Check email logs: Add print statements and check Render logs
4. Test with: `python manage.py shell`
   ```python
   from django.core.mail import send_mail
   send_mail('Test', 'Testing email', 'your-email@gmail.com', ['recipient@example.com'])
   ```

### ❌ API Returning 500 Errors
**Solution:**
1. Check Render logs for stack trace
2. Common causes: Missing environment variable, database issue, static files
3. Redeploy with manual trigger if needed

## Rollback

If something goes wrong:
1. Render dashboard → your service → "Deploys" tab
2. Find previous working deployment
3. Click "Deploy" on that version
4. Previous version will be restored

## Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Update dependencies monthly
- [ ] Test email functionality periodically
- [ ] Back up database (Render provides automatic snapshots on paid plans)

### Database Backups
- Render free tier: Automatic snapshots (7-day retention)
- For production: Consider upgrading or manually exporting data

### Updating Dependencies
```bash
# Locally
pip list --outdated
pip install --upgrade package-name

# Update requirements.txt
pip freeze > requirements.txt

# Commit and push
git add requirements.txt
git commit -m "Update dependencies"
git push
```

Render will automatically redeploy with new dependencies.

## Useful Commands

### SSH into Container (Render Web Service)
- Not directly available in Render dashboard
- Alternative: Use Render shell access in logs or deploy debugging

### Manual Database Migration
- Handled automatically during deploy
- For emergency migrations: Render provides "Run Command" feature
- Connect via Render web terminal if needed

### View Real-time Logs
```
Render Dashboard → Service → Logs (auto-refresh enabled)
```

## Support

- Render Docs: https://render.com/docs
- Django Docs: https://docs.djangoproject.com
- Novessa Project Docs: See README.md

---

**Status**: ✅ Backend is ready for deployment
**Last Updated**: 2026-06-19
