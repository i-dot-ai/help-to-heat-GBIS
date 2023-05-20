import functools
import os
import pathlib
import random
import string

import furl
import httpx
import testino
from django.conf import settings
from help_to_heat import wsgi

TEST_SERVER_URL = "http://help-to-heat-testserver/"


def make_code(length=6):
    return "".join(random.choices(string.ascii_uppercase, k=length))


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


def get_latest_email_text():
    email_dir = pathlib.Path(settings.EMAIL_FILE_PATH)
    latest_email_path = max(email_dir.iterdir(), key=os.path.getmtime)
    content = latest_email_path.read_text()
    return content


def get_latest_email_url():
    text = get_latest_email_text()
    lines = text.splitlines()
    url_lines = tuple(word for line in lines for word in line.split() if word.startswith(settings.BASE_URL))
    assert len(url_lines) == 1
    email_url = url_lines[0].strip()
    email_url = furl.furl(email_url)
    email_url = email_url.tostr()
    return email_url


def get_latest_email_password():
    text = get_latest_email_text()
    lines = iter(text.splitlines())
    for line in lines:
        if line.startswith("Your temporary password is") or line.startswith("Your one time password code is"):
            token = next(lines).strip()
            return token
