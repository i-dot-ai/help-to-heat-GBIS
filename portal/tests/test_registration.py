from django.contrib.auth import authenticate
from django.utils import timezone
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
        models.User.objects.get(email=email).delete()
    user = models.User.objects.create_user(email, password)
    user.full_name = "Test Team Lead"
    user.invite_accepted_at = timezone.now()
    user.is_team_leader = True
    user.supplier_id = models.Supplier.objects.get(name="Octopus").id
    user.save()
    page = login(client, email, password)
    assert page.has_text("Logout")
    return page


def invite_user(name, email, password, role):
    client = utils.get_client()
    page = login_as_team_leader(client, email="team-leader@example.com", password="Fl1bbl3Fl1bbl3")
    page = page.click(contains="Add a new team member or leader")

    form = page.get_form()
    form["team-role"] = role
    page = form.submit().follow()

    form = page.get_form()
    form["user-name"] = name
    form["user-email"] = email
    page = form.submit().follow()

    assert page.has_text(name)

    invite_url = utils.get_latest_email_url()
    password = utils.get_latest_email_password()

    client = utils.get_client()
    page = client.get(invite_url)

    form = page.get_form()
    form["login"] = email
    form["password"] = password
    page = form.submit().follow()

    form = page.get_form()
    form["password1"] = password
    form["password2"] = password
    page = form.submit().follow()

    form = page.get_form()
    form["login"] = email
    form["password"] = password
    page = form.submit().follow()
    return page


def test_team_leader():
    client = utils.get_client()
    email = f"larry-the-leader+{utils.make_code()}@example.com"
    new_password = "N3wP455w0rd"
    team_lead_name = f"Larry the Leader {utils.make_code()}"
    role = "team-leader"
    page = login_as_team_leader(client, email="team-leader@example.com", password="Fl1bbl3Fl1bbl3")
    page = page.click(contains="Add a new team member or leader")

    page = invite_user(team_lead_name, email, new_password, role)

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


def test_team_member():
    client = utils.get_client()
    email = f"milly-the-member+{utils.make_code()}@example.com"
    new_password = "N3wP455w0rd"
    team_lead_name = f"Milly the member {utils.make_code()}"
    role = "team-member"
    page = login_as_team_leader(client, email="team-leader@example.com", password="Fl1bbl3Fl1bbl3")
    page = page.click(contains="Add a new team member or leader")

    page = invite_user(team_lead_name, email, new_password, role)
    assert page.status_code == 200
    assert not page.has_one("""h1:contains('Manage team members')""")


def test_no_supplier_set():
    email = f"nancy-no-supplier+{utils.make_code()}@example.com"
    password = "Fl1bbl3Fl1bbl3"
    user = models.User.objects.create_user(email, password)
    user.invite_accepted_at = timezone.now()
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


def test_login_without_invite():
    email = f"admin-user{utils.make_code()}@example.com"
    password = "Fl1bbl3Fl1bbl3"

    models.User.objects.create_user(email, password)
    client = utils.get_client()

    page = client.get(utils.make_url("/accounts/login/"))
    form = page.get_form()
    form["login"] = email
    form["password"] = password
    page = form.submit()
    page = page.follow()
    assert page.has_text("The email address or password you entered is incorrect. Please try again.")
