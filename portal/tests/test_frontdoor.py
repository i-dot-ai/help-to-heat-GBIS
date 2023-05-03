import unittest

import testino
from django.conf import settings
from help_to_heat import wsgi

TEST_SERVER_URL = "http://help-to-heat-testserver/"


@unittest.skipIf(not settings.SHOW_FRONTDOOR, "Frontdoor disabled")
def test_flow():
    client = testino.WSGIAgent(wsgi.application, TEST_SERVER_URL)
    page = client.get("/")
    assert page.status_code == 200
    assert page.has_one("h1:contains('Homepage')")
