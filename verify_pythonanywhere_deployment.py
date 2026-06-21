from pathlib import Path


ROOT = Path(__file__).resolve().parent
API_ROOT = ROOT / "apps" / "api"


def require_file(path: Path, label: str) -> bool:
    if path.exists():
        print(f"[OK] {label}: {path}")
        return True
    print(f"[FAIL] {label}: {path}")
    return False


def require_text(path: Path, needle: str, label: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if needle in text:
        print(f"[OK] {label}")
        return True
    print(f"[FAIL] {label}")
    return False


def main() -> int:
    checks = [
        require_file(ROOT / "PYTHONANYWHERE_DEPLOYMENT.md", "PythonAnywhere deployment guide"),
        require_file(ROOT / "pythonanywhere_wsgi.py", "PythonAnywhere WSGI template"),
        require_file(API_ROOT / ".env.pythonanywhere.example", "PythonAnywhere env example"),
        require_file(API_ROOT / "requirements.txt", "Python requirements"),
        require_file(API_ROOT / "manage.py", "Django manage.py"),
        require_text(ROOT / "pythonanywhere_wsgi.py", "/home/novessa/novessa/apps/api", "WSGI points to PythonAnywhere API path"),
        require_text(ROOT / "PYTHONANYWHERE_DEPLOYMENT.md", "novessa.pythonanywhere.com", "Deployment guide uses target domain"),
        require_text(API_ROOT / ".env.pythonanywhere.example", "DATABASE_URL=sqlite:////home/novessa/novessa/apps/api/db.sqlite3", "SQLite database URL configured"),
        require_text(API_ROOT / ".env.pythonanywhere.example", "ADMIN_EMAIL=segunbanji@gmail.com", "Admin email configured"),
    ]
    passed = sum(checks)
    total = len(checks)
    print(f"\nVerification Results: {passed}/{total} checks passed")
    return 0 if passed == total else 1


if __name__ == "__main__":
    raise SystemExit(main())
