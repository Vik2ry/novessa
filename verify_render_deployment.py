#!/usr/bin/env python
"""
Verification script to ensure backend is ready for Render deployment.
Run this locally before pushing to Render.
"""

import os
import sys
import subprocess
from pathlib import Path

def check_file_exists(path, description):
    """Check if a required file exists."""
    if Path(path).exists():
        print(f"[OK] {description}: {path}")
        return True
    else:
        print(f"[FAIL] {description} NOT FOUND: {path}")
        return False

def check_file_contains(path, text, description):
    """Check if a file contains specific text."""
    if not Path(path).exists():
        print(f"[FAIL] File not found: {path}")
        return False
    
    with open(path, 'r') as f:
        content = f.read()
        if text in content:
            print(f"[OK] {description}")
            return True
        else:
            print(f"[FAIL] {description} - text not found: {text}")
            return False

def run_command(cmd, description):
    """Run a command and check if it succeeds."""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd='apps/api')
        if result.returncode == 0:
            print(f"[OK] {description}")
            return True
        else:
            print(f"[FAIL] {description} - Command failed:")
            print(f"   Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"[FAIL] {description} - Exception: {e}")
        return False

def main():
    print("=" * 60)
    print("Novessa Backend - Render Deployment Verification")
    print("=" * 60)
    
    checks_passed = 0
    checks_total = 0
    
    # Check 1: Required files exist
    print("\nChecking Required Files...")
    required_files = [
        ("render.yaml", "Render configuration"),
        ("apps/api/Dockerfile", "Docker configuration"),
        ("apps/api/requirements.txt", "Python dependencies"),
        ("apps/api/.python-version", "Python version file"),
        ("apps/api/config/settings/production.py", "Production settings"),
        ("RENDER_DEPLOYMENT.md", "Deployment guide"),
    ]
    
    for file_path, description in required_files:
        checks_total += 1
        if check_file_exists(file_path, description):
            checks_passed += 1
    
    # Check 2: render.yaml configuration
    print("\nChecking render.yaml Configuration...")
    render_yaml_checks = [
        ("apps/api", "API service root directory"),
        ("config.wsgi:application", "WSGI application"),
        ("gunicorn", "Gunicorn server"),
        ("novessa-postgres", "PostgreSQL database"),
        ("fromDatabase", "PostgreSQL DATABASE_URL binding"),
        ("python manage.py migrate", "Migration command"),
    ]
    
    for check_text, description in render_yaml_checks:
        checks_total += 1
        if check_file_contains("render.yaml", check_text, description):
            checks_passed += 1
    
    # Check 3: Django settings
    print("\nChecking Django Security Settings...")
    production_checks = [
        ("DEBUG = False", "DEBUG disabled in production"),
        ("SECURE_SSL_REDIRECT", "SSL redirect enabled"),
        ("SESSION_COOKIE_SECURE", "Secure session cookie"),
        ("CSRF_COOKIE_SECURE", "Secure CSRF cookie"),
    ]
    
    for check_text, description in production_checks:
        checks_total += 1
        if check_file_contains("apps/api/config/settings/production.py", check_text, description):
            checks_passed += 1
    
    # Check 4: Database configuration
    print("\nChecking Database Configuration...")
    db_checks = [
        ("env.db(", "DATABASE_URL handling with env.db()"),
        ("dj-database-url", "dj-database-url in requirements"),
        ("psycopg", "psycopg PostgreSQL driver in requirements"),
    ]
    
    checks_total += 1
    if check_file_contains("apps/api/config/settings/base.py", db_checks[0][0], db_checks[0][1]):
        checks_passed += 1
    
    checks_total += 1
    if check_file_contains("apps/api/requirements.txt", db_checks[1][0], db_checks[1][1]):
        checks_passed += 1
    
    checks_total += 1
    if check_file_contains("apps/api/requirements.txt", db_checks[2][0], db_checks[2][1]):
        checks_passed += 1
    
    # Check 5: Static files and WhiteNoise
    print("\nChecking Static Files Configuration...")
    static_checks = [
        ("apps/api/requirements.txt", "whitenoise", "WhiteNoise in requirements"),
        ("apps/api/config/settings/base.py", "STATIC_ROOT", "Static root configured"),
        ("render.yaml", "collectstatic", "Collectstatic in build command"),
    ]
    
    for file_path, check_text, description in static_checks:
        checks_total += 1
        if check_file_contains(file_path, check_text, description):
            checks_passed += 1
    
    # Check 6: Health check endpoint
    print("\nChecking Health Check Endpoint...")
    checks_total += 1
    if check_file_contains("apps/api/apps/core/urls.py", "health", "Health check endpoint"):
        checks_passed += 1
    
    # Check 7: Email configuration
    print("\nChecking Email Configuration...")
    email_checks = [
        ("EMAIL_BACKEND", "Email backend configured"),
        ("EMAIL_HOST", "Email host configured"),
        ("EMAIL_PORT", "Email port configured"),
    ]
    
    for check_text, description in email_checks:
        checks_total += 1
        if check_file_contains("apps/api/config/settings/base.py", check_text, description):
            checks_passed += 1
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"Verification Results: {checks_passed}/{checks_total} checks passed")
    print("=" * 60)
    
    if checks_passed == checks_total:
        print("[OK] All checks passed! Backend is ready for Render deployment.")
        print("\nNext steps:")
        print("1. Push code to GitHub: git push origin main")
        print("2. Follow QUICK_START_DEPLOY.md for deployment steps")
        return 0
    else:
        print(f"[WARN] {checks_total - checks_passed} check(s) failed. Please review above.")
        print("\nFor more details, see RENDER_DEPLOYMENT.md")
        return 1

if __name__ == "__main__":
    sys.exit(main())
