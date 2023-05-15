from django.urls import path

from . import views

frontdoor_patterns = [
    path("", views.homepage_view, name="homepage"),
    path("<uuid:session_id>/<path:page_name>", views.page_view, name="page"),
]
