import datetime

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
    if not models.User.objects.filter(email=email).exists():
        user = models.User.objects.create_user(email, password)
    else:
        user = models.User.objects.get(email=email)
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
    page = login_as_team_leader(client, email="team-leader@example.com", password="Fl1bbl3Fl1bbl3")
    page = page.click(contains="Add a new team member or leader")

    form = page.get_form()
    form["team-role"] = "team-leader"
    page = form.submit().follow()

    form = page.get_form()
    form["user-name"] = "Bob the Leader"
    form["user-email"] = email
    page = form.submit()

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

    assert page.has_one("""h1:contains("Manage team members")""")


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
