import functools

import help_to_heat.wsgi
import httpx

TEST_SERVER_URL = "http://help-to-heat-testserver/"


def with_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        with httpx.Client(app=help_to_heat.wsgi.application, base_url=TEST_SERVER_URL) as client:
            return func(client, *args, **kwargs)

    return _inner
