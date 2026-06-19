# Quick Start: Deploy to Render

Your backend is ready for deployment! Here's what to do:

## 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

## 2. Create Services on Render

### Database First (PostgreSQL)
1. Go to https://render.com
2. Click "New +" → "PostgreSQL"
3. Name it: `novessa-postgres`
4. Click "Create Database"
5. ⏳ Wait for creation (2-3 minutes)

### Then Create API Service
1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. **Name**: `novessa`
4. **Runtime**: Python (auto-detected)
5. **Root Directory**: `apps/api` (auto-detected from render.yaml)
6. Click "Create Web Service"

## 3. Link Database to API
1. Go to your `novessa` service
2. Scroll to "Environment" section
3. Find "PostgreSQL" section
4. Click "Add Database" and select `novessa-postgres`
5. Click "Save Changes"

## 4. Add Environment Variables
In your API service's "Environment" settings, add:

```
EMAIL_HOST_USER = your-email@gmail.com
EMAIL_HOST_PASSWORD = your-gmail-app-password
PAYSTACK_PUBLIC_KEY = pk_test_xxxxx
PAYSTACK_SECRET_KEY = sk_test_xxxxx
```

(Get Gmail app password: https://myaccount.google.com/apppasswords)

## 5. Wait for Deployment
- Render will automatically build and deploy
- Takes 3-5 minutes
- Check "Logs" tab to monitor

## 6. Test It Works
Visit: `https://novessa.onrender.com/api/v1/health/`

Should return:
```json
{"status": "ok", "service": "novessa-django-api"}
```

## 7. Update Frontend (When Ready)
In `apps/web/.env`, update:
```
NEXT_PUBLIC_API_BASE_URL=https://novessa.onrender.com/api/v1
```

Then deploy frontend to Vercel or Render.

---

## ✅ What's Already Configured

- ✅ `render.yaml` - Deployment configuration
- ✅ `Dockerfile` - Container setup
- ✅ `requirements.txt` - All dependencies
- ✅ `.python-version` - Python 3.12.6
- ✅ Security settings - SSL, HTTPS, headers
- ✅ Database handling - PostgreSQL ready
- ✅ Static files - WhiteNoise configured
- ✅ Health check - `/api/v1/health/`
- ✅ Migrations - Auto-run on deploy

## 📚 Full Documentation

- [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) - Complete deployment guide
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Detailed checklist
- [README.md](./README.md) - Project overview

## ❓ Need Help?

If something goes wrong:
1. Check logs in Render dashboard
2. Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) troubleshooting section
3. Render docs: https://render.com/docs

---

**Last Updated**: June 19, 2026
**Status**: ✅ Ready for deployment
