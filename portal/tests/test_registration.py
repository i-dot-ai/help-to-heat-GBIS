import testino
from django.conf import settings
from help_to_heat import wsgi

TEST_SERVER_URL = "http://help-to-heat-testserver/"

if settings.SHOW_FRONTDOOR:
    url_prefix = "/portal"
else:
    url_prefix = ""


def test_registration():
    client = testino.WSGIAgent(wsgi.application, TEST_SERVER_URL)
    page = client.get(f"{url_prefix}/")
    assert page.status_code == 302
