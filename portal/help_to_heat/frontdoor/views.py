from django.shortcuts import render


def homepage_view(request):
    return render(request, template_name="frontdoor/homepage.html")


def page_view(request, page_name):
    return render(request, template_name=f"frontdoor/{page_name}.html")
