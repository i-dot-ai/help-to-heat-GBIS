import marshmallow
from django.shortcuts import redirect, render
from django.urls import reverse
from help_to_heat import utils

from . import schemas

page_map = {}

page_order = (
    "country",
    "own-property",
)


def register_page(name):
    def _inner(func):
        page_map[name] = func
        return func

    return _inner


def homepage_view(request):
    context = {"next_url": reverse("frontdoor:page", kwargs=dict(page_name="country"))}
    return render(request, template_name="frontdoor/homepage.html", context=context)


@register_page("country")
class CountryView(utils.MethodDispatcher):
    def get(self, request):
        context = {"country_options": schemas.country_options}
        return render(request, template_name="frontdoor/country.html", context=context)

    def post(self, request):
        result = schemas.CountrySchema(unknown=marshmallow.EXCLUDE).load(request.POST)
        if result["country"] == "Northern Ireland":
            return redirect("frontdoor:page", page_name="northern-ireland")
        else:
            next_page_name = page_order[page_order.index("country") + 1]
            return redirect("frontdoor:page", page_name=next_page_name)


@register_page("own-property")
class OwnPropertyView(utils.MethodDispatcher):
    def get(self, request):
        context = {"own_property_options": schemas.own_property_options}
        return render(request, template_name="frontdoor/own-property.html", context=context)

    def post(self, request):
        result = schemas.OwnPropertySchema(unknown=marshmallow.EXCLUDE).load(request.POST)
        next_page_name = page_order[page_order.index("country") + 1]
        return redirect("frontdoor:page", page_name=next_page_name)


def page_view(request, page_name):
    context = {}
    if page_name in page_map:
        return page_map[page_name](request)

    return render(request, template_name=f"frontdoor/{page_name}.html", context=context)
