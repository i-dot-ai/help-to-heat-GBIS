from django.contrib import admin
from django.urls import include, path
from help_to_heat.ecoplus import views

urlpatterns = [
    path("", views.index_view, name="index"),
    path("home/", views.homepage_view, name="homepage"),
    path("unauthorised/", views.unauthorised_view, name="unauthorised"),
    path("admin/", admin.site.urls),
    path("api/referral/", views.create_referral, name="create-referral"),
    path("api/epc-rating/<int:uprn>/", views.lookup_epc_view, name="lookup-epc"),
    path("accounts/", include("allauth.urls")),
]
