import uuid

from django.shortcuts import redirect, render
from django.urls import reverse
from help_to_heat import utils

from . import interface, schemas

page_map = {}


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


def get_prev_next_page_name(page_name):
    assert page_name in schemas.pages
    page_index = schemas.pages.index(page_name)
    if page_index == 0:
        prev_page_name = None
    else:
        prev_page_name = schemas.pages[page_index - 1]
    if page_index + 1 == len(schemas.pages):
        next_page_name = None
    else:
        next_page_name = schemas.pages[page_index + 1]
    return prev_page_name, next_page_name


def get_prev_next_urls(session_id, page_name):
    prev_page_name, next_page_name = get_prev_next_page_name(page_name)
    prev_page_url = prev_page_name and reverse(
        "frontdoor:page", kwargs=dict(session_id=session_id, page_name=prev_page_name)
    )
    next_page_url = next_page_name and reverse(
        "frontdoor:page", kwargs=dict(session_id=session_id, page_name=next_page_name)
    )
    return prev_page_url, next_page_url


class PageView(utils.MethodDispatcher):
    def get(self, request, session_id, page_name):
        prev_page_url, next_page_url = get_prev_next_urls(session_id, page_name)
        data = interface.api.session.get_answer(session_id, page_name)
        extra_context = self.get_context(request, session_id, page_name)
        context = {"data": data, "prev_url": prev_page_url, "next_url": next_page_url, **extra_context}
        return render(request, template_name=f"frontdoor/{page_name}.html", context=context)

    def post(self, request, session_id, page_name):
        data = interface.api.session.save_answer(session_id, page_name, request.POST)
        return self.handle_post(request, session_id, page_name, data)

    def get_context(self, *args, **kwargs):
        return {}

    def handle_post(self, request, session_id, page_name, data):
        next_page_name = schemas.pages[schemas.pages.index(page_name) + 1]
        return redirect("frontdoor:page", session_id=session_id, page_name=next_page_name)


@register_page("country")
class CountryView(PageView):
    def get_context(self, *args, **kwargs):
        return {"country_options": schemas.country_options}

    def handle_post(self, request, session_id, page_name, data):
        if data["country"] == "Northern Ireland":
            return redirect("frontdoor:page", session_id=session_id, page_name="northern-ireland")
        else:
            next_page_name = schemas.pages[schemas.pages.index(page_name) + 1]
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


@register_page("household-income")
class HouseholdIncomeView(PageView):
    def get_context(self, *args, **kwargs):
        return {"household_income_options": schemas.household_income_options}


@register_page("property-type")
class PropertyTypeView(PageView):
    def get_context(self, *args, **kwargs):
        return {"property_type_options": schemas.property_type_options}


@register_page("number-of-bedrooms")
class NumberOfBedroomsView(PageView):
    def get_context(self, *args, **kwargs):
        return {"number_of_bedrooms_options": schemas.number_of_bedrooms_options}


@register_page("wall-type")
class WallTypeView(PageView):
    def get_context(self, *args, **kwargs):
        return {"wall_type_options": schemas.wall_type_options}


@register_page("wall-insulation")
class WallInsulationView(PageView):
    def get_context(self, *args, **kwargs):
        return {"wall_insulation_options": schemas.wall_insulation_options}


@register_page("loft")
class LoftView(PageView):
    def get_context(self, *args, **kwargs):
        return {"loft_options": schemas.yes_no_options}


def page_view(request, session_id, page_name):
    context = {}
    if page_name in page_map:
        return page_map[page_name](request, session_id, page_name)

    return render(request, template_name=f"frontdoor/{page_name}.html", context=context)
