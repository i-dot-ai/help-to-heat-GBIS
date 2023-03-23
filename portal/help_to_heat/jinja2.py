import jinja2
from django.conf import settings
from django.contrib import messages
from django.templatetags.static import static
from django.urls import reverse


def url(path, *args, **kwargs):
    assert not (args and kwargs)
    return reverse(path, args=args, kwargs=kwargs)


def environment(**options):
    extra_options = dict(
        loader=jinja2.ChoiceLoader(
            [
                options["loader"],
                jinja2.PrefixLoader({"govuk_frontend_jinja": jinja2.PackageLoader("govuk_frontend_jinja")}),
            ]
        )
    )
    env = jinja2.Environment(
        **{
            **options,
            **extra_options,
        }
    )
    env.globals.update(
        {
            "static": static,
            "url": url,
            "get_messages": messages.get_messages,
            "DEBUG": settings.DEBUG,
            "space_name": settings.VCAP_APPLICATION.get("space_name", "unknown"),
        }
    )
    return env
