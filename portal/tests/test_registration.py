import datetime

from django.contrib.auth import authenticate
from help_to_heat.portal import models

from . import utils


def test_registration():
    client = utils.get_client()
    page = client.get(utils.make_url("/"))
    assert page.status_code == 302


def login(client, email, password):
    page = client.get(utils.make_url("/accounts/login/"))
    form = page.get_form()
    form["login"] = email
    form["password"] = password
    page = form.submit()
    page = page.follow()
    return page


def login_as_team_leader(client, email, password):
    if models.User.objects.filter(email=email).exists():
        user = models.User.objects.get(email=email).delete()
    user = models.User.objects.create_user(email, password)
    user.full_name = "Test Team Lead"
    user.invite_accepted_at = datetime.datetime.now()
    user.is_team_leader = True
    user.supplier_id = models.Supplier.objects.get(name="Octopus").id
    user.save()
    page = login(client, email, password)
    assert page.has_text("Logout")
    return page


def test_email():
    client = utils.get_client()
    email = f"bob-the-leader+{utils.make_code}@example.com"
    new_password = "N3wP455w0rd"
    team_lead_name = f"Bob the Leader {utils.make_code}"
    page = login_as_team_leader(client, email="team-leader@example.com", password="Fl1bbl3Fl1bbl3")
    page = page.click(contains="Add a new team member or leader")

    form = page.get_form()
    form["team-role"] = "team-leader"
    page = form.submit().follow()

    form = page.get_form()
    form["user-name"] = team_lead_name
    form["user-email"] = email
    page = form.submit().follow()

    assert page.has_text(team_lead_name)

    invite_url = utils.get_latest_email_url()
    password = utils.get_latest_email_password()

    client = utils.get_client()
    page = client.get(invite_url)

    form = page.get_form()
    form["login"] = email
    form["password"] = password
    page = form.submit().follow()

    form = page.get_form()
    form["password1"] = new_password
    form["password2"] = new_password
    page = form.submit().follow()

    form = page.get_form()
    form["login"] = email
    form["password"] = new_password
    page = form.submit().follow()

    assert page.has_one("""h1:contains('Manage team members')""")

    page = page.click(f"""th:contains('{team_lead_name}') ~ td:nth-of-type(4) a""")

    assert page.status_code == 200

    page = page.click("""dt:contains('Role') ~ dd:nth-of-type(2) a:contains('Edit')""")

    form = page.get_form()
    form["user-name"] = f"{team_lead_name} v2"
    page = form.submit().follow()
    page = page.click(contains="Disable")

    form = page.get_form()
    page = form.submit().follow()

    assert page.has_one("dt:contains('Status') ~ dd:contains('Disabled')")


def test_no_supplier_set():
    email = f"nancy-no-supplier+{utils.make_code}@example.com"
    password = "Fl1bbl3Fl1bbl3"
    user = models.User.objects.create_user(email, password)
    user.invite_accepted_at = datetime.datetime.now()
    user.is_team_leader = True
    user.supplier_id = None
    user.save()

    client = utils.get_client()
    login(client, email, password)
    page = client.get(utils.make_url("/"))
    assert page.status_code == 403


def test_password_reset():
    email = "team-leader@example.com"
    new_password = "Bl4mbl3Bl4mbl3"
    client = utils.get_client()
    page = login_as_team_leader(client, email=email, password="Fl1bbl3Fl1bbl3")
    page = client.get(utils.make_url("/accounts/login/"))
    page = page.click(contains="Request password reset")
    form = page.get_form()
    form["email"] = email
    page = form.submit().follow()

    invite_url = utils.get_latest_email_url()
    otp = utils.get_latest_email_password()
    page = client.get(invite_url)
    form = page.get_form()
    form["verification-code"] = otp
    form["password1"] = new_password
    form["password2"] = new_password
    page = form.submit().follow()

    user = authenticate(None, email=email, password=new_password)
    assert user.email == email
