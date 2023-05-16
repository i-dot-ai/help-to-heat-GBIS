import unittest
import uuid

from django.conf import settings
from help_to_heat.frontdoor import models

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

    answer = models.Answer.objects.filter(session_id=session_id, page_name="country").get()
    assert answer.data["country"] == "Northern Ireland"


@unittest.skipIf(not settings.SHOW_FRONTDOOR, "Frontdoor disabled")
def test_flow():
    client = utils.get_client()
    page = client.get("/")

    assert page.status_code == 200
    assert page.has_one("h1:contains('Get home energy improvements')")

    page = page.click(contains="Start")
    assert page.status_code == 200

    session_id = page.path.split("/")[1]
    assert uuid.UUID(session_id)

    form = page.get_form()
    form["country"] = "England"
    page = form.submit().follow()

    assert page.has_text("Do you own your property?")

    form = page.get_form()
    form["own_property"] = "Yes, I own my property and live in it"
    page = form.submit().follow()

    answer = models.Answer.objects.filter(session_id=session_id, page_name="own-property").get()
    assert answer.data["own_property"] == "Yes, I own my property and live in it"

    assert page.has_one("h1:contains('What is the address of your property?')")

    form = page.get_form()
    form["address_line_1"] = "999 Letsby Avenue"
    form["postcode"] = "PO99 9PO"
    page = form.submit().follow()

    assert page.has_one("h1:contains('What is the council tax band of your property?')")

    form = page.get_form()
    form["council_tax_band"] = "B"
    page = form.submit().follow()

    assert page.has_one("h1:contains('Is anyone in your household receiving any benefits?')")

    form = page.get_form()
    form["benefits"] = "Yes"
    page = form.submit().follow()

    assert page.has_one("h1:contains('What is your annual household income?')")

    form = page.get_form()
    form["household_income"] = "Less than £31,000 a year"
    page = form.submit().follow()


@unittest.skipIf(not settings.SHOW_FRONTDOOR, "Frontdoor disabled")
def test_back_button():
    client = utils.get_client()
    page = client.get("/")

    assert page.status_code == 200
    assert page.has_one("h1:contains('Get home energy improvements')")

    page = page.click(contains="Start")
    assert page.status_code == 200

    session_id = page.path.split("/")[1]
    assert uuid.UUID(session_id)

    form = page.get_form()
    form["country"] = "England"
    page = form.submit().follow()

    assert page.has_text("Do you own your property?")

    form = page.get_form()
    form["own_property"] = "Yes, I own my property and live in it"
    page = form.submit().follow()

    assert page.has_one("h1:contains('What is the address of your property?')")

    page = page.click(contains=("Back"))

    form = page.get_form()
    assert form["own_property"] == "Yes, I own my property and live in it"

    page = page.click(contains=("Back"))

    form = page.get_form()
    assert form["country"] == "England"
