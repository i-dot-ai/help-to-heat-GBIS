from django.contrib import admin
from django.urls import include, path
from help_to_heat.portal.urls import api_patterns, portal_patterns

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(api_patterns)),
    path("portal/", include(portal_patterns)),
]
