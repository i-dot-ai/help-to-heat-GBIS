import datetime

from help_to_heat.portal import models

from . import utils


def login(client, email, password):
    page = client.get("/portal/accounts/login/")
    form = page.get_form()
    form["login"] = email
    form["password"] = password
    page = form.submit()
    page = page.follow()
    return page


def test_service_manager_add_supplier():
    client = utils.get_client()
    supplier_name = f"Mr Flibble's Energy Co - {utils.make_code()}"
    team_lead_name = f"Mr Team Lead - {utils.make_code()}"
    team_lead_email = f"mr-team-leader-{utils.make_code()}@example.com"
    page = utils.login_as_service_manager(client)
    page = page.click(contains="Add a new energy supplier")
    form = page.get_form()
    form["supplier_name"] = supplier_name
    page = form.submit().follow()
    assert page.has_one(f"""th:contains("{supplier_name}")""")

    page = page.click(f"""th:contains("{supplier_name}") ~ td:nth-of-type(3) a""")
    page = page.click(contains="Edit")
    assert page.status_code == 200

    form = page.get_form()
    form["supplier_name"] = f"{supplier_name} v2"
    page = form.submit().follow()
    assert page.status_code == 200

    assert page.has_one(f"""th:contains("{supplier_name} v2")""")

    page = page.click(f"""th:contains("{supplier_name} v2") ~ td:nth-of-type(3) a""")
    page = page.click(contains="Disable")
    assert page.status_code == 200

    assert page.has_text("""Disable energy supplier""")
    form = page.get_form()
    page = form.submit().follow()

    assert page.has_one(f"""th:contains("{supplier_name} v2") ~ td:nth-of-type(1):contains("Disabled")""")

    page = page.click(f"""th:contains("{supplier_name} v2") ~ td:nth-of-type(3) a""")
    page = page.click(contains="Add a new team lead")
    assert page.status_code == 200

    form = page.get_form()
    form["team-leader-name"] = team_lead_name
    form["team-leader-email"] = team_lead_email
    page = form.submit().follow()

    page = page.click(f"""th:contains("{team_lead_name}") ~ td:nth-of-type(3) a""")

    form = page.get_form()
    form["team-leader-name"] = f"{team_lead_name} v2"
    page = form.submit().follow()

    page = page.click(f"""th:contains("{team_lead_name} v2") ~ td:nth-of-type(3) a""")

    page = page.click(contains="Disable")
    form = page.get_form()
    page = form.submit().follow()

    assert page.has_one(f"""th:contains("{team_lead_name} v2") ~ td:nth-of-type(2):contains("Disabled")""")


def test_legacy_download():
    models.Referral.objects.filter(referral_download=None).delete()
    models.EpcRating.objects.update_or_create(
        uprn="202134001", defaults={"rating": "E", "date": datetime.date(1990, 1, 1)}
    )

    legacy_data = {
        "loft": "no",
        "house": "semi-detached",
        "walls": "solid",
        "location": "England",
        "property": "house",
        "addressUPRN": "202134001",
        "housingStatus": "owner",
        "councilTaxBand": "C",
        "energySupplier": "Octopus",
        "propertyHasEpc": "yes",
        "wallInsulation": "some",
        "householdIncome": "<£31k",
        "address.postcode": "W1A 1AA",
        "numberOfBedrooms": "3+",
        "receivingBenefits": "yes",
        "suggestedEPCFound": False,
        "counciltaxBandsSize": 8,
        "personalDetails.email": "flampy.flibbleton@example.com",
        "personalDetails.lastName": "Flampy",
        "personalDetails.firstName": "Flibbleton",
        "personalDetails.phoneNumber": "07950000000",
        "address.buildingNumberOrName": "63",
        "propertyEpcDetails.propertyEpcRating": "E",
        "propertyEpcDetails.propertyEpcDate.day": "01",
        "propertyEpcDetails.propertyEpcDate.year": "1990",
        "propertyEpcDetails.propertyEpcDate.month": "01",
    }
    anterograde_data = {
        "benefits": "Yes",
        "country": "Wales",
        "property_type": "House",
        "last_name": "",
        "email": "",
        "own_property": "No, I am a tenant",
        "number_of_bedrooms": "Three or more bedrooms",
        "council_tax_band": "A",
        "loft_access": "No, there is no access to my loft",
        "address_line_1": "5 Sesame Street",
        "wall_type": "Cavity walls",
        "wall_insulation": "Some are insulated, some are not",
        "loft": "No",
        "first_name": "",
        "supplier": "Octopus",
        "contact_number": "",
        "postcode": "S55 5SS",
        "household_income": "Less than £31,000 a year",
    }
    supplier = models.Supplier.objects.get(name="Octopus")
    models.Referral.objects.create(supplier=supplier, data=legacy_data)
    models.Referral.objects.create(supplier=supplier, data=anterograde_data)

    client = utils.get_client()
    page = utils.login_as_team_leader(client)
    assert page.has_one("p:contains('Unread leads') ~ p:contains('2')")

    csv_page = page.click(contains="Download latest leads")
    text = csv_page.content
    lines = text.splitlines()
    assert len(lines) == 3
    assert len(lines[0].split(b",")) == 32, len(lines[0].split(b","))
