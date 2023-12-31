from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from help_to_heat import views
from help_to_heat.frontdoor.urls import frontdoor_patterns
from help_to_heat.portal.urls import api_patterns, portal_patterns

urlpatterns = [
    path("api/", include(api_patterns)),
    path("robots.txt", views.robots_txt_view),
    path("portal/", include((portal_patterns, "portal"))),
    path("", include((frontdoor_patterns, "frontdoor"))),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + [path("admin/", admin.site.urls)]
