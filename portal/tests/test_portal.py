import datetime

from help_to_heat.portal import models

from . import utils


def login(client, email, password):
    page = client.get(utils.make_url("/accounts/login/"))
    form = page.get_form()
    form["login"] = email
    form["password"] = password
    page = form.submit()
    page = page.follow()
    return page


def login_as_service_manager(client, email, password):
    if models.User.objects.filter(email=email).exists():
        user = models.User.objects.get(email=email).delete()
    user = models.User.objects.create_user(email, password)
    user.invite_accepted_at = datetime.datetime.now()
    user.is_supplier_admin = True
    user.save()
    page = login(client, email, password)
    assert page.has_text("Logout")
    return page


def test_service_manager_add_supplier():
    client = utils.get_client()
    supplier_name = f"Mr Flibble's Energy Co - {utils.make_code}"
    team_lead_name = f"Mr Team Lead - {utils.make_code}"
    team_lead_email = f"mr-team-leader-{utils.make_code}@example.com"
    page = login_as_service_manager(client, email="service-manager@example.com", password="Fl1bbl3Fl1bbl3")
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
    form['team-leader-name'] = team_lead_name
    form['team-leader-email'] = team_lead_email
    page = form.submit().follow()

    page = page.click(f"""th:contains("{team_lead_name}") ~ td:nth-of-type(3) a""")

    form = page.get_form()
    form['team-leader-name'] = f"{team_lead_name} v2"
    page = form.submit().follow()

    page = page.click(f"""th:contains("{team_lead_name} v2") ~ td:nth-of-type(3) a""")

    page = page.click(contains="Disable")
    form = page.get_form()
    page = form.submit().follow()

    assert page.has_one(f"""th:contains("{team_lead_name} v2") ~ td:nth-of-type(2):contains("Disabled")""")
