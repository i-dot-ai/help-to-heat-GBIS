import csv
import unittest

from . import utils
from .test_frontdoor import _do_happy_flow


def _check_referral_csv():
    client = utils.get_client()
    page = utils.login_as_team_leader(client, supplier="OVO")
    assert page.has_one("p:contains('Unread leads') ~ p:contains('1')")

    csv_page = page.click(contains="Download latest leads")
    text = csv_page.content.decode("utf-8")
    lines = text.splitlines()
    assert len(lines) == 2
    assert len(lines[0].split(",")) == 29, len(lines[0].split(","))

    rows = list(csv.DictReader(lines))
    data = rows[0]
    assert data["epc_date"] == "2022-12-25"


def _check_service_analytics():
    client = utils.get_client()
    page = utils.login_as_service_manager(client)
    assert page.has_one("a:contains('Download service analytics')")


@unittest.mock.patch("osdatahub.PlacesAPI", utils.StubAPI)
def test_csv():
    _do_happy_flow(supplier="OVO")
    _check_referral_csv()
    _check_service_analytics()
