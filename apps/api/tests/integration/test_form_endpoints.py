import pytest

from apps.forms.models import PartnerInquiry, VolunteerApplication


@pytest.mark.django_db
def test_partner_inquiry_endpoint_persists_submission(client):
    response = client.post(
        "/api/v1/forms/partner/",
        data={
            "organizationName": "Apex Financial Group",
            "contactName": "Jordan Cole",
            "email": "jordan@example.com",
            "industry": "Finance",
            "collaborationInterest": "Strategic Sponsorship",
            "message": "We would like to support your mental health programs.",
        },
        content_type="application/json",
    )
    assert response.status_code == 201
    inquiry = PartnerInquiry.objects.get(email="jordan@example.com")
    assert inquiry.organization_name == "Apex Financial Group"


@pytest.mark.django_db
def test_volunteer_endpoint_stores_availability(client, monkeypatch):
    monkeypatch.setattr("apps.forms.views.MailgunEmailService.volunteer_confirmation", lambda *args, **kwargs: None)
    response = client.post(
        "/api/v1/forms/volunteer/",
        data={
            "fullName": "Tolu Adeyemi",
            "email": "tolu@example.com",
            "roleInterest": "Community Outreach",
            "availability": ["Weekdays", "Weekends"],
        },
        content_type="application/json",
    )
    assert response.status_code == 201
    application = VolunteerApplication.objects.get(email="tolu@example.com")
    assert application.availability == ["Weekdays", "Weekends"]
