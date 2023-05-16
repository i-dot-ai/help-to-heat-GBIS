import unittest

from django.conf import settings

from . import utils


@unittest.skipIf(not settings.SHOW_FRONTDOOR, "Frontdoor disabled")
def test_flow():
    client = utils.get_client()
    page = client.get("/")

    assert page.status_code == 200
    assert page.has_one("h1:contains('Homepage')")
