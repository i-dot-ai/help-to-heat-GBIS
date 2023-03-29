import testino
from help_to_heat import wsgi

TEST_SERVER_URL = "http://help-to-heat-testserver/"


def test_registration():
    client = testino.WSGIAgent(wsgi.application, TEST_SERVER_URL)
    page = client.get("/")
    assert page.status_code == 200
