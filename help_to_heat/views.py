import os

from django.http import HttpResponse

from help_to_heat import settings


def robots_txt_view(request):
    file_path = os.path.join(settings.BASE_DIR, "static/robots.txt")
    with open(file_path, "r") as f:
        content = f.read()
    return HttpResponse(content, content_type="text/plain")
