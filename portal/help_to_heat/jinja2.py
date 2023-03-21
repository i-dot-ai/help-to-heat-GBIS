import jinja2
from django.conf import settings
from django.templatetags.static import static
from django.urls import reverse


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
            "url": reverse,
            "DEBUG": settings.DEBUG,
            "space_name": settings.VCAP_APPLICATION.get("space_name", "unknown"),
        }
    )
    return env
