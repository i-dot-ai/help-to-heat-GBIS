from django.contrib import admin
from django.urls import include, path
from help_to_heat.ecoplus import views

urlpatterns = [
    path("", views.index_view, name="index"),
    path("home/", views.homepage_view, name="homepage"),
    path("admin/", admin.site.urls),
    path("api/referral/", views.create_referral, name="create-referral"),
    path("accounts/", include("allauth.urls")),
]
