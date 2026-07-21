"""Backend API tests for Suhas SK portfolio."""
import os
import pytest
import requests

BASE_URL = "https://suhas-labs.preview.emergentagent.com"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Root health ----
def test_root(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json() == {"message": "Portfolio API online"}


# ---- Projects ----
def test_projects_list(client):
    r = client.get(f"{BASE_URL}/api/projects")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 7
    required = {"id", "name", "description", "html_url", "tags", "accent"}
    for p in data:
        assert required.issubset(p.keys()), f"missing keys in {p}"
        assert isinstance(p["tags"], list)


# ---- Contact valid ----
def test_contact_post_valid_and_persistence(client):
    payload = {
        "name": "TEST_Tester",
        "email": "test_tester@example.com",
        "subject": "TEST subject line",
        "message": "TEST_message_body_over_ten_chars",
    }
    r = client.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["status"] == "success"
    assert body["email_delivered"] is False
    assert "id" in body and len(body["id"]) > 0
    assert "message" in body
    contact_id = body["id"]

    # Verify persisted
    r2 = client.get(f"{BASE_URL}/api/contact/messages")
    assert r2.status_code == 200
    msgs = r2.json()
    assert isinstance(msgs, list)
    found = [m for m in msgs if m.get("id") == contact_id]
    assert found, "submitted contact not persisted"
    assert found[0]["email"] == payload["email"]
    assert found[0]["email_sent"] is False


# ---- Contact validation ----
@pytest.mark.parametrize("payload", [
    {},  # missing all
    {"name": "A", "email": "notanemail", "subject": "s", "message": "hello world!!"},  # bad email
    {"name": "A", "email": "a@b.com", "subject": "s"},  # missing message
])
def test_contact_invalid(client, payload):
    r = client.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 422


# ---- Sort order ----
def test_contact_messages_sorted_desc(client):
    r = client.get(f"{BASE_URL}/api/contact/messages")
    assert r.status_code == 200
    msgs = r.json()
    if len(msgs) >= 2:
        ts = [m["timestamp"] for m in msgs]
        assert ts == sorted(ts, reverse=True)
