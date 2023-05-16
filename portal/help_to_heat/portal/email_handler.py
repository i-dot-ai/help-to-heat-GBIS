import datetime
import secrets

import furl
import pytz
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.urls import reverse
from help_to_heat.portal import models


def _strip_microseconds(dt):
    if not dt:
        return None
    return dt.replace(microsecond=0, tzinfo=None)


class EmailVerifyTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        email = user.email or ""
        token_timestamp = _strip_microseconds(user.last_token_sent_at)
        return f"{user.pk}{user.password}{timestamp}{email}{token_timestamp}"


class PasswordResetTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        login_timestamp = _strip_microseconds(user.last_login)
        email = user.email or ""
        token_timestamp = _strip_microseconds(user.last_token_sent_at)
        return f"{user.pk}{user.password}{login_timestamp}{timestamp}{email}{token_timestamp}"


class InviteTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        invited_timestamp = _strip_microseconds(user.invited_at)
        email = user.email or ""
        token_timestamp = _strip_microseconds(user.last_token_sent_at)
        return f"{user.pk}{invited_timestamp}{timestamp}{email}{token_timestamp}"


EMAIL_VERIFY_TOKEN_GENERATOR = EmailVerifyTokenGenerator()
PASSWORD_RESET_TOKEN_GENERATOR = PasswordResetTokenGenerator()
INVITE_TOKEN_GENERATOR = InviteTokenGenerator()


EMAIL_MAPPING = {
    "password-reset": {
        "from_address": settings.FROM_EMAIL,
        "subject": "Help to heat: password reset",
        "template_name": "portal/email/password-reset.txt",
        "url_name": "password-reset-change",
        "token_generator": PASSWORD_RESET_TOKEN_GENERATOR,
    },
    "invite-user": {
        "from_address": settings.FROM_EMAIL,
        "subject": "Help to heat: invitation to system",
        "template_name": "portal/email/invite-user.txt",
        "url_name": "account_login",
        "token_generator": INVITE_TOKEN_GENERATOR,
    },
}


def _send_token_email(user, subject, template_name, from_address, url_name, token_generator, one_time_password=None):
    user.last_token_sent_at = datetime.datetime.now(tz=pytz.UTC)
    user.save()
    token = token_generator.make_token(user)
    base_url = settings.BASE_URL
    url_path = reverse(url_name)
    url = str(furl.furl(url=base_url, path=url_path, query_params={"code": token, "user_id": str(user.id)}))
    context = dict(user=user, url=url, contact_address=settings.CONTACT_EMAIL, one_time_password=one_time_password)
    body = render_to_string(template_name, context)
    response = send_mail(
        subject=subject,
        message=body,
        from_email=from_address,
        recipient_list=[user.email],
    )
    return response


def _send_normal_email(subject, template_name, from_address, to_address, context):
    body = render_to_string(template_name, context)
    response = send_mail(
        subject=subject,
        message=body,
        from_email=from_address,
        recipient_list=[to_address],
    )
    return response


def send_password_reset_email(user):
    reset_requests = models.PasswordResetRequest.objects.filter(user=user, is_completed=False, is_abandoned=False)
    for reset_request in reset_requests:
        reset_request.is_abandoned = True
        reset_request.save()
    one_time_password = secrets.token_hex(4)
    hashed_one_time_password = make_password(one_time_password)
    reset_request = models.PasswordResetRequest(
        user=user, one_time_password=hashed_one_time_password, is_completed=False
    )
    reset_request.save()
    one_time_password_upper = one_time_password.upper()
    data = EMAIL_MAPPING["password-reset"]
    data["one_time_password"] = one_time_password_upper
    return _send_token_email(user, **data)


def send_invite_email(user):
    data = EMAIL_MAPPING["invite-user"]
    user.invited_at = datetime.datetime.now()
    initial_password = secrets.token_hex(8)
    user.set_password(initial_password.upper())
    user.save()
    data["one_time_password"] = initial_password.upper()
    return _send_token_email(user, **data)


def verify_token(user_id, token, token_type):
    user = models.User.objects.get(id=user_id)
    result = EMAIL_MAPPING[token_type]["token_generator"].check_token(user, token)
    return result
