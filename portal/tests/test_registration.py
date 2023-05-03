from . import utils


def test_registration():
    client = utils.get_portal_client()
    page = client.get("/")
    assert page.status_code == 302
