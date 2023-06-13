import unittest

from django.conf import settings

from . import utils


@unittest.skipIf(not settings.BASIC_AUTH, "No basic auth set")
def test_homepage_basic_auth():
    client = utils.get_client()
    page = client.get("/")
    assert page.status_code == 401


@unittest.skipIf(not settings.BASIC_AUTH, "No basic auth set")
def test_portal_basic_auth():
    client = utils.get_client()
    page = client.get("/portal/")
    assert page.status_code == 401
