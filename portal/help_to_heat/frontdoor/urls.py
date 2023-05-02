from django.urls import path

from . import views

frontdoor_patterns = [
    path("", views.homepage_view, name="homepage"),
]
