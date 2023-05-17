import unittest
import uuid

from django.conf import settings
from help_to_heat.frontdoor import interface

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

    data = interface.api.session.get_answer(session_id, page_name="country")
    assert data["country"] == "Northern Ireland"


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

    data = interface.api.session.get_answer(session_id, page_name="own-property")
    assert data["own_property"] == "Yes, I own my property and live in it"

    assert page.has_one("h1:contains('What is the address of your property?')")

    form = page.get_form()
    form["address_line_1"] = "999 Letsby Avenue"
    form["postcode"] = "PO99 9PO"
    page = form.submit().follow()

    data = interface.api.session.get_answer(session_id, page_name="address")
    assert data["address_line_1"] == "999 Letsby Avenue"
    assert data["postcode"] == "PO99 9PO"

    assert page.has_one("h1:contains('What is the council tax band of your property?')")

    form = page.get_form()
    form["council_tax_band"] = "B"
    page = form.submit().follow()

    data = interface.api.session.get_answer(session_id, page_name="council-tax-band")
    assert data["council_tax_band"] == "B"

    assert page.has_one("h1:contains('Is anyone in your household receiving any benefits?')")

    form = page.get_form()
    form["benefits"] = "Yes"
    page = form.submit().follow()

    data = interface.api.session.get_answer(session_id, page_name="benefits")
    assert data["benefits"] == "Yes"

    assert page.has_one("h1:contains('What is your annual household income?')")

    form = page.get_form()
    form["household_income"] = "Less than £31,000 a year"
    page = form.submit().follow()

    data = interface.api.session.get_answer(session_id, page_name="household-income")
    assert data["household_income"] == "Less than £31,000 a year"

    assert page.has_one("h1:contains('What kind of property do you have?')")

    form = page.get_form()
    form["property_type"] = "House"
    page = form.submit().follow()

    data = interface.api.session.get_answer(session_id, page_name="property-type")
    assert data["property_type"] == "House"

    assert page.has_one("h1:contains('Number of bedrooms')")

    form = page.get_form()
    form["number_of_bedrooms"] = "Two bedrooms"
    page = form.submit().follow()

    data = interface.api.session.get_answer(session_id, page_name="number-of-bedrooms")
    assert data["number_of_bedrooms"] == "Two bedrooms"

    form = page.get_form()
    form["wall_type"] = "Cavity walls"
    page = form.submit().follow()

    data = interface.api.session.get_answer(session_id, page_name="wall-type")
    assert data["wall_type"] == "Cavity walls"


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
