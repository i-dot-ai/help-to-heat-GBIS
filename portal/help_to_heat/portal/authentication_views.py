import logging

from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.shortcuts import redirect, render
from django.utils import timezone
from django.views.decorators.http import require_http_methods
from help_to_heat.portal import email_handler, models
from help_to_heat.utils import MethodDispatcher

logger = logging.getLogger(__name__)


@require_http_methods(["GET", "POST"])
class CustomLoginView(MethodDispatcher):
    error_message = "Something has gone wrong.  Please contact your team leader."

    def error(self, request):
        messages.error(request, self.error_message)
        return render(request, "account/accept_invite.html")

    def get(self, request):
        return render(request, "account/login.html")

    def post(self, request):
        password = request.POST.get("password", None)
        email = request.POST.get("login", None)
        if not password or not email:
            messages.error(request, "Please enter an email and password.")
            return render(request, "account/login.html", {})
        else:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                if not user.invite_accepted_at:
                    return self.error(request)
                login(request, user)
                return redirect("portal:homepage")
            else:
                return self.error(request)


@require_http_methods(["GET", "POST"])
class AcceptInviteView(MethodDispatcher):
    error_message = "Something has gone wrong.  Please contact your team leader."

    def get(self, request):
        return render(request, "account/accept_invite.html")

    def error(self, request):
        messages.error(request, self.error_message)
        return render(request, "account/accept_invite.html")

    def post(self, request):
        email = request.POST.get("email", None)
        user_id = request.GET.get("user_id", "")
        token = request.GET.get("code", "")

        if not email:
            messages.error(request, "Please enter an email.")
            return render(request, "account/accept_invite.html")

        try:
            user = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return self.error(request)

        if user.invite_accepted_at:
            return self.error(request)

        if not user_id or not token:
            return self.error(request)

        result = email_handler.verify_token(user_id, token, "invite-user")
        if not result:
            return self.error(request)

        return redirect("portal:account_login_set_password", user.id)


@require_http_methods(["GET", "POST"])
class SetPassword(MethodDispatcher):
    def get(self, request, user_id):
        return render(request, "account/login_set_password.html", {"user_id": user_id})

    def post(self, request, user_id):
        pwd1 = request.POST.get("password1", None)
        pwd2 = request.POST.get("password2", None)
        if pwd1 != pwd2:
            messages.error(request, "Passwords must match.")
            return render(request, "account/login_set_password.html", {"user_id": user_id})
        try:
            validate_password(pwd1)
        except ValidationError as e:
            for msg in e:
                messages.error(request, str(msg))
            return render(request, "account/login_set_password.html", {"user_id": user_id})
        user = models.User.objects.get(pk=user_id)
        user.set_password(pwd1)
        user.invite_accepted_at = timezone.now()
        user.save()
        messages.info(request, "Password successfully set.")
        login(request, user)
        return redirect("portal:homepage")


@require_http_methods(["GET", "POST"])
class PasswordReset(MethodDispatcher):
    def get(self, request):
        return render(request, "account/password_reset.html", {})

    def post(self, request):
        email = request.POST.get("email")
        try:
            user = models.User.objects.get(email=email)
        except models.User.DoesNotExist:
            return redirect("portal:password-reset-done")
        email_handler.send_password_reset_email(user)
        return redirect("portal:password-reset-done")


def password_reset_done(request):
    return render(request, "account/password_reset_done.html", {})


def password_reset_from_key_done(request):
    return render(request, "account/password_reset_from_key_done.html", {})


@require_http_methods(["GET", "POST"])
class PasswordChange(MethodDispatcher):
    password_reset_error_message = (
        "This link is not valid. It may have expired or have already been used. Please try again."
    )

    def get_token_request_args(self, request):
        user_id = request.GET.get("user_id", None)
        token = request.GET.get("code", None)
        valid_request = False
        if not user_id or not token:
            logger.error("No user_id or no token")
            messages.error(request, self.password_reset_error_message)
        else:
            result = email_handler.verify_token(user_id, token, "password-reset")
            if not result:
                logger.error("No result")
                messages.error(request, self.password_reset_error_message)
            else:
                valid_request = True
        return user_id, token, valid_request

    def get(self, request):
        try:
            _, _, valid_request = self.get_token_request_args(request)
            return render(request, "account/password_reset_from_key.html", {"valid": valid_request})
        except models.User.DoesNotExist:
            return render(request, "account/password_reset_from_key.html", {"valid": False})

    def post(self, request):
        user_id, token, valid_request = self.get_token_request_args(request)
        pwd1 = request.POST.get("password1", None)
        pwd2 = request.POST.get("password2", None)
        if pwd1 != pwd2:
            logger.error("Passwords don't match")
            messages.error(request, "Passwords must match.")
            return render(request, "account/password_reset_from_key.html", {"valid": valid_request})
        if not valid_request:
            logger.error("Not valid request")
            messages.error(request, self.password_reset_error_message)
            return render(request, "account/password_reset_from_key.html", {"valid": valid_request})
        user = models.User.objects.get(pk=user_id)
        try:
            validate_password(pwd1, user)
        except ValidationError as e:
            for msg in e:
                logger.error(str(msg))
                messages.error(request, str(msg))
            return render(request, "account/password_reset_from_key.html", {"valid": valid_request})
        user.set_password(pwd1)
        user.save()
        return redirect("portal:password-reset-from-key-done")
