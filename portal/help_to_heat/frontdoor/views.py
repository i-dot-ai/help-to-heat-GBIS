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
    def get(self, request, session_id, page_name, is_change_page=False):
        if is_change_page:
            prev_page_url = reverse("frontdoor:page", kwargs=dict(session_id=session_id, page_name="summary"))
            next_page_url = None
        else:
            prev_page_url, next_page_url = get_prev_next_urls(session_id, page_name)
        data = interface.api.session.get_answer(session_id, page_name)
        extra_context = self.get_context(request=request, session_id=session_id, page_name=page_name, data=data)
        context = {"data": data, "prev_url": prev_page_url, "next_url": next_page_url, **extra_context}
        return render(request, template_name=f"frontdoor/{page_name}.html", context=context)

    def post(self, request, session_id, page_name, is_change_page=False):
        data = interface.api.session.save_answer(session_id, page_name, request.POST)
        return self.handle_post(request, session_id, page_name, data, is_change_page)

    def get_context(self, request, session_id, page_name, data):
        return {}

    def handle_post(self, request, session_id, page_name, data, is_change_page):
        if is_change_page:
            next_page_name = "summary"
        else:
            next_page_name = schemas.pages[schemas.pages.index(page_name) + 1]
        return redirect("frontdoor:page", session_id=session_id, page_name=next_page_name)


@register_page("country")
class CountryView(PageView):
    def get_context(self, *args, **kwargs):
        return {"country_options": schemas.country_options}

    def handle_post(self, request, session_id, page_name, data, is_change_page):
        if data["country"] == "Northern Ireland":
            return redirect("frontdoor:page", session_id=session_id, page_name="northern-ireland")
        elif data["country"] == "Scotland":
            return redirect("frontdoor:page", session_id=session_id, page_name="scotland")
        else:
            return super().handle_post(request, session_id, page_name, data, is_change_page)


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


@register_page("loft-access")
class LoftAccessView(PageView):
    def get_context(self, *args, **kwargs):
        return {"loft_access_options": schemas.loft_access_options}


@register_page("summary")
class SummaryView(PageView):
    def get_context(self, request, session_id, *args, **kwargs):
        summary_lines = (
            {
                "question": schemas.page_map[page],
                "answer": "".join(value for value in interface.api.session.get_answer(session_id, page).values()),
                "change_url": reverse("frontdoor:change-page", kwargs=dict(session_id=session_id, page_name=page)),
            }
            for page in schemas.household_pages
        )
        return {"summary_lines": summary_lines}


@register_page("schemes")
class SchemesView(PageView):
    def get_context(self, request, session_id, *args, **kwargs):
        benefits_data = interface.api.session.get_answer(session_id, "benefits")
        eligible_schemes = schemas.schemes_map[benefits_data["benefits"]]
        return {"eligible_schemes": eligible_schemes}


@register_page("supplier")
class SupplierView(PageView):
    def get_context(self, *args, **kwargs):
        return {"supplier_options": schemas.supplier_options}


@register_page("contact-details")
class ContactDetailsView(PageView):
    def handle_post(self, request, session_id, page_name, data, is_change_page):
        interface.api.session.create_referral(session_id)
        return super().handle_post(request, session_id, page_name, data, is_change_page)


def page_view(request, session_id, page_name):
    context = {}
    if page_name in page_map:
        return page_map[page_name](request, session_id, page_name)

    return render(request, template_name=f"frontdoor/{page_name}.html", context=context)


def change_page_view(request, session_id, page_name):
    assert page_name in page_map
    return page_map[page_name](request, session_id, page_name, is_change_page=True)
