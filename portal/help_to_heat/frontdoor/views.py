import marshmallow
from django.shortcuts import redirect, render

from . import schemas


def homepage_view(request):
    return render(request, template_name="frontdoor/homepage.html")


def page_view(request, page_name):
    context = {}
    if page_name == "country":
        if request.method == "GET":
            context = {"countries": schemas.countries_options}
        elif request.method == "POST":
            result = schemas.CountrySchema(unknown=marshmallow.EXCLUDE).load(request.POST)
            if result["country"] == "Northern Ireland":
                return redirect("frontdoor:page", page_name="northern-ireland")
    return render(request, template_name=f"frontdoor/{page_name}.html", context=context)
