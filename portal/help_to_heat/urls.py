from django.contrib import admin
from django.urls import include, path
from help_to_heat.ecoplus import views

from help_to_heat.ecoplus import supplier_and_user_management_views

urlpatterns = [
    path("", views.index_view, name="index"),
    path("unauthorised/", views.unauthorised_view, name="unauthorised"),
    path("home/", views.homepage_view, name="homepage"),
    path("add-supplier/", supplier_and_user_management_views.add_supplier_view, name="add-supplier"),
    path("edit-supplier/<uuid:supplier_id>/", supplier_and_user_management_views.edit_supplier_view, name="edit-supplier"),
    path("change-supplier-disabled-status/<uuid:supplier_id>/", supplier_and_user_management_views.change_supplier_disabled_status_view, name="change-supplier-disabled-status"),
    path("supplier/<uuid:supplier_id>/team-leads/", supplier_and_user_management_views.supplier_team_leads_view, name="supplier-team-leads"),
    path("supplier/<uuid:supplier_id>/team-leads/add/", supplier_and_user_management_views.supplier_team_leads_add_view, name="supplier-team-leads-add"),
    path("supplier/<uuid:supplier_id>/team-leads/edit/<uuid:user_id>", supplier_and_user_management_views.supplier_team_leads_edit_view, name="supplier-team-leads-edit"),
    path("supplier/<uuid:supplier_id>/team-leads/remove/<uuid:user_id>", supplier_and_user_management_views.supplier_team_leads_remove_view, name="supplier-team-leads-remove"),
    path("supplier/<uuid:supplier_id>/user/add/role/", supplier_and_user_management_views.team_member_add_role_view, name="add-user-role-select"),
    path("supplier/<uuid:supplier_id>/user/add/<str:user_role>/", supplier_and_user_management_views.team_member_add_details_view, name="add-user-details-select"),
    path("supplier/<uuid:supplier_id>/user/<uuid:user_id>/details/", supplier_and_user_management_views.team_member_details_view, name="user-details"),
    path("supplier/<uuid:supplier_id>/user/<uuid:user_id>/remove/", supplier_and_user_management_views.team_member_remove_view, name="remove-user"),
    path("admin/", admin.site.urls),
    path("api/referral/", views.create_referral, name="create-referral"),
    path("api/epc-rating/<int:uprn>/", views.lookup_epc_view, name="lookup-epc"),
    path("accounts/", include("allauth.urls")),
]
