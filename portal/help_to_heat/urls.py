from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from help_to_heat.frontdoor.urls import frontdoor_patterns
from help_to_heat.portal.urls import api_patterns, portal_patterns

if settings.SHOW_FRONTDOOR:
    urlpatterns = [
        path("", include(frontdoor_patterns)),
        path("portal/", include(portal_patterns)),
    ]
else:
    urlpatterns = [
        path("", include(portal_patterns)),
    ]


urlpatterns = urlpatterns + [
    path("admin/", admin.site.urls),
    path("api/", include(api_patterns)),
]
