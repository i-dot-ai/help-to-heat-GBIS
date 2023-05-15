import uuid
import unittest

from django.conf import settings

from . import utils


@unittest.skipIf(not settings.SHOW_FRONTDOOR, "Frontdoor disabled")
def test_flow_northern_ireland():
    client = utils.get_client()
    page = client.get("/")

    assert page.status_code == 200
    assert page.has_one("h1:contains('Get home energy improvements')")

    page = page.click(contains="Start")
    assert page.status_code == 200

    session_id = page.path.split("/")[1]
    assert uuid.UUID(session_id)

    form = page.get_form()
    form["country"] = "Northern Ireland"
    page = form.submit().follow()

    assert page.has_text("Not available in Northern Ireland")


@unittest.skipIf(not settings.SHOW_FRONTDOOR, "Frontdoor disabled")
def test_flow():
    client = utils.get_client()
    page = client.get("/")

    assert page.status_code == 200
    assert page.has_one("h1:contains('Get home energy improvements')")

    page = page.click(contains="Start")
    assert page.status_code == 200

    form = page.get_form()
    form["country"] = "England"
    page = form.submit().follow()

    assert page.has_text("Do you own your property?")

    form = page.get_form()
    form["own-property"] = "Yes, I own my property and live in it"
    page = form.submit().follow()
