import testino
from django.conf import settings
from help_to_heat import wsgi

TEST_SERVER_URL = "http://help-to-heat-testserver/"

if settings.SHOW_FRONTDOOR:
    PORTAL_SERVER_URL = "http://help-to-heat-testserver/portal/"
else:
    PORTAL_SERVER_URL = "http://help-to-heat-testserver/"


class PortalClient(testino.WSGIAgent):
    def get(self, url, data=None, **kwargs):
        if settings.SHOW_FRONTDOOR and url.startswith("/"):
            url = f".{url}"
        return super().get(url, data=None, **kwargs)

    def post(self, url, data=None, **kwargs):
        if settings.SHOW_FRONTDOOR and url.startswith("/"):
            url = f".{url}"
        return super().post(url, data=None, **kwargs)


def get_portal_client():
    return PortalClient(wsgi.application, base_url=PORTAL_SERVER_URL)


def get_client():
    return testino.WSGIAgent(wsgi.application, base_url=TEST_SERVER_URL)
