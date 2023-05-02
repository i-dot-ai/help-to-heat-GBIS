from django.shortcuts import render


def homepage_view(request):
    return render(request, template_name="homepage.html")
