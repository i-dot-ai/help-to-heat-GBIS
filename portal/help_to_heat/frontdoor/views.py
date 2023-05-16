import uuid

import marshmallow
from django.shortcuts import redirect, render
from django.urls import reverse
from help_to_heat import utils
from help_to_heat.frontdoor import models

from . import schemas

page_map = {}

page_order = (
    "country",
    "own-property",
    "address",
    "council-tax-band",
    "benefits",
    "end",
)


def register_page(name):
    def _inner(func):
        page_map[name] = func
        return func

    return _inner


def homepage_view(request):
    session_id = uuid.uuid4()
    next_url = reverse("frontdoor:page", kwargs=dict(session_id=session_id, page_name="country"))
    context = {
        "next_url": next_url,
    }
    return render(request, template_name="frontdoor/homepage.html", context=context)


class PageView(utils.MethodDispatcher):
    def get(self, request, session_id, page_name):
        context = self.get_context(request, session_id, page_name)
        return render(request, template_name=f"frontdoor/{page_name}.html", context=context)

    def post(self, request, session_id, page_name):
        data = schemas.SessionSchema(unknown=marshmallow.EXCLUDE).load(request.POST)
        models.Answer.objects.create(data=data, session_id=session_id, page_name=page_name)
        return self.handle_post(request, session_id, page_name, data)

    def get_context(self, *args, **kwargs):
        return {}

    def handle_post(self, request, session_id, page_name, data):
        next_page_name = page_order[page_order.index(page_name) + 1]
        return redirect("frontdoor:page", session_id=session_id, page_name=next_page_name)


@register_page("country")
class CountryView(PageView):
    def get_context(self, *args, **kwargs):
        return {"country_options": schemas.country_options}

    def handle_post(self, request, session_id, page_name, data):
        if data["country"] == "Northern Ireland":
            return redirect("frontdoor:page", session_id=session_id, page_name="northern-ireland")
        else:
            next_page_name = page_order[page_order.index(page_name) + 1]
            return redirect("frontdoor:page", session_id=session_id, page_name=next_page_name)


@register_page("own-property")
class OwnPropertyView(PageView):
    def get_context(self, *args, **kwargs):
        return {"own_property_options": schemas.own_property_options}


@register_page("address")
class AddressView(PageView):
    pass


@register_page("council-tax-band")
class CouncilTaxBandView(PageView):
    def get_context(self, *args, **kwargs):
        return {"council_tax_band_options": schemas.council_tax_band_options}


@register_page("benefits")
class BenefitsView(PageView):
    def get_context(self, *args, **kwargs):
        return {"benefits_options": schemas.yes_no_options}


def page_view(request, session_id, page_name):
    context = {}
    if page_name in page_map:
        return page_map[page_name](request, session_id, page_name)

    return render(request, template_name=f"frontdoor/{page_name}.html", context=context)
