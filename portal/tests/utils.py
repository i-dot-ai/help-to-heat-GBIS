import functools
import json
import os
import pathlib
import random
import string

import furl
import httpx
import requests_mock
import testino
from django.conf import settings
from django.utils import timezone
from help_to_heat import wsgi
from help_to_heat.portal import models

__here__ = pathlib.Path(__file__).parent
DATA_DIR = __here__ / "data"

TEST_SERVER_URL = "http://help-to-heat-testserver/"


class StubAPI:
    files = {
        "find": "sample_osdatahub_find_response.json",
        "uprn": "sample_osdatahub_uprn_response.json",
    }

    def __init__(self, key):
        self.key = key

    def find(self, text, dataset=None):
        content = (DATA_DIR / self.files["find"]).read_text()
        data = json.loads(content)
        return data

    def uprn(self, uprn, dataset=None):
        content = (DATA_DIR / self.files["uprn"]).read_text()
        data = json.loads(content)
        return data


class EmptyAPI(StubAPI):
    files = {
        "find": "empty_osdatahub_response.json",
        "uprn": "empty_osdatahub_response.json",
    }


def mock_os_api(func):
    find_data = (DATA_DIR / "sample_os_api_find_response.json").read_text()
    uprn_data = (DATA_DIR / "sample_os_api_uprn_response.json").read_text()

    @functools.wraps(func)
    def _inner(*args, **kwargs):
        with requests_mock.Mocker() as m:
            m.register_uri("GET", "https://api.os.uk/search/places/v1/find", text=find_data)
            m.register_uri("GET", "https://api.os.uk/search/places/v1/uprn", text=uprn_data)
            return func()

    return _inner


def make_code(length=6):
    return "".join(random.choices(string.ascii_lowercase, k=length))


def with_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        with httpx.Client(app=wsgi.application, base_url=TEST_SERVER_URL) as client:
            return func(client, *args, **kwargs)

    return _inner


def make_url(url):
    if settings.SHOW_FRONTDOOR:
        return str(furl.furl("/portal") / url)
    else:
        return url


def get_client():
    return testino.WSGIAgent(wsgi.application, base_url=TEST_SERVER_URL)


def wipe_emails():
    email_dir = pathlib.Path(settings.EMAIL_FILE_PATH)
    if email_dir.exists():
        for f in email_dir.iterdir():
            if f.is_file():
                f.unlink()


def get_latest_email_text(email):
    email_dir = pathlib.Path(settings.EMAIL_FILE_PATH)
    latest_email_path = max(email_dir.iterdir(), key=os.path.getmtime)
    content = latest_email_path.read_text()
    assert f"To: {email}" in content.splitlines(), (f"To: {email}", content.splitlines())
    return content


def get_latest_email_url(email):
    text = get_latest_email_text(email)
    lines = text.splitlines()
    url_lines = tuple(word for line in lines for word in line.split() if word.startswith(settings.BASE_URL))
    assert len(url_lines) == 1
    email_url = url_lines[0].strip()
    email_url = furl.furl(email_url)
    email_url = email_url.tostr()
    return email_url


def get_latest_email_password(email):
    text = get_latest_email_text(email)
    lines = iter(text.splitlines())
    for line in lines:
        if line.startswith("Your temporary password is") or line.startswith("Your one time password code is"):
            token = next(lines).strip()
            return token


def login_as_service_manager(client, email=None, password=None):
    return login_as_role(client, "service_manager", email=email, password=password)


def login_as_team_leader(client, email=None, password=None):
    return login_as_role(client, "team_leader", email=email, password=password)


def login_as_role(client, role, email=None, password=None):
    assert role in ("team_leader", "service_manager")
    if not email:
        email = f"{role.replace('_', '-')}+{make_code()}@example.com"
    if not password:
        password = "Fl1bbl3Fl1bbl3"
    user = models.User.objects.create_user(email, password)
    user.full_name = f"Test {role.replace('_', ' ').capitalize()}"
    user.invite_accepted_at = timezone.now()
    if role == "team_leader":
        user.is_team_leader = True
        user.supplier_id = models.Supplier.objects.get(name="Octopus").id
    elif role == "service_manager":
        user.is_supplier_admin = True
    user.save()
    page = login(client, email, password)
    assert page.has_text("Logout")
    return page


def login(client, email, password):
    page = client.get(make_url("/accounts/login/"))
    form = page.get_form()
    form["login"] = email
    form["password"] = password
    page = form.submit()
    page = page.follow()
    return page
