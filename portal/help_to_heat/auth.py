import base64
import binascii
import logging

from django.conf import settings
from django.http import HttpResponse

logger = logging.getLogger(__name__)
SENTINEL = object()


def get_auth_from_header(request):
    auth = request.META.get("HTTP_AUTHORIZATION", b"")
    if isinstance(auth, str):
        auth = auth.encode("utf-8")
    if not auth or auth[0].lower() != b"basic":
        return False
    if len(auth) == 1:
        logger.error("Basic auth header too short")
        return False
    elif len(auth) > 2:
        logger.error("Basic auth header too long")
        return False
    try:
        try:
            auth_decoded = base64.b64decode(auth[1]).decode("utf-8")
        except UnicodeDecodeError:
            auth_decoded = base64.b64decode(auth[1]).decode("latin-1")

        username, password = auth_decoded.split(":", 1)
    except (TypeError, ValueError, UnicodeDecodeError, binascii.Error):
        logger.error("Basic auth incorrectly base64 encoded")
        return False

    return (username, password)


def basic_auth_middleware(get_response):
    auth_values = settings.BASIC_AUTH.split(",")
    auth_pairs = tuple(v.split(":", 1) for v in auth_values)
    auth_map = {k: v for (k, v) in auth_pairs}

    def middleware(request):
        user_name, password = get_auth_from_header(request)
        if (user_name in auth_map) and (auth_map[user_name] == password):
            response = get_response(request)
        else:
            response = HttpResponse("Unauthorized", status=401, headers={"WWW-Authenticate": 'Basic realm="site"'})

        return response

    return middleware
