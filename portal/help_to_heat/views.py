from http.client import HTTPResponse
from importlib.abc import Finder


def robots_txt_view(request):
    file_path = Finder.find("robots.txt")
    with open(file_path, "r") as f:
        content = f.read()
    return HTTPResponse(content, content_type="text/plain")
