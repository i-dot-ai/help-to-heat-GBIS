from django.urls import include, path

from . import (
    authentication_views,
    download_views,
    supplier_and_user_management_views,
    views,
)

portal_patterns = [
    path("", views.homepage_view, name="homepage"),
    path("unauthorised/", views.unauthorised_view, name="unauthorised"),
    path("add-supplier/", supplier_and_user_management_views.add_supplier_view, name="add-supplier"),
    path(
        "supplier/<uuid:supplier_id>/edit/",
        supplier_and_user_management_views.edit_supplier_view,
        name="edit-supplier",
    ),
    path(
        "supplier/<uuid:supplier_id>/change-status/",
        supplier_and_user_management_views.change_supplier_disabled_status_view,
        name="change-supplier-disabled-status",
    ),
    path(
        "supplier/<uuid:supplier_id>/team-leads/",
        supplier_and_user_management_views.supplier_team_leads_view,
        name="supplier-team-leads",
    ),
    path(
        "supplier/<uuid:supplier_id>/team-leads/add/",
        supplier_and_user_management_views.supplier_team_leads_add_view,
        name="supplier-team-leads-add",
    ),
    path(
        "supplier/<uuid:supplier_id>/team-leads/<uuid:user_id>/edit/",
        supplier_and_user_management_views.supplier_team_leads_edit_view,
        name="supplier-team-leads-edit",
    ),
    path(
        "supplier/<uuid:supplier_id>/team-leads/<uuid:user_id>/change-status/",
        supplier_and_user_management_views.change_supplier_team_leads_disable_status_view,
        name="change-supplier-team-lead-status",
    ),
    path(
        "supplier/<uuid:supplier_id>/user/add/",
        supplier_and_user_management_views.team_member_add_role_view,
        name="add-user-role-select",
    ),
    path(
        "supplier/<uuid:supplier_id>/user/add/<str:user_role>/",
        supplier_and_user_management_views.team_member_add_details_view,
        name="add-user-details-select",
    ),
    path(
        "supplier/<uuid:supplier_id>/user/<uuid:user_id>/details/",
        supplier_and_user_management_views.team_member_details_view,
        name="user-details",
    ),
    path(
        "supplier/<uuid:supplier_id>/user/<uuid:user_id>/remove/",
        supplier_and_user_management_views.team_member_remove_view,
        name="remove-user",
    ),
    path("data-download/", download_views.download_csv_view, name="data-download"),
    path("data-download/<uuid:download_id>/", download_views.download_csv_by_id_view, name="download-csv-by-id"),
    path("accounts/password-reset/", authentication_views.PasswordReset, name="password-reset"),
    path("accounts/change-password/reset/", authentication_views.PasswordChange, name="password-reset-change"),
    path(
        "accounts/login/<uuid:user_id>/set-password/",
        authentication_views.SetPassword,
        name="account_login_set_password",
    ),
    path("accounts/login/", authentication_views.CustomLoginView, name="account_login"),
    path("accounts/", include("allauth.urls")),
]

api_patterns = [
    path("referral/", views.create_referral, name="create-referral"),
    path("epc-rating/<int:uprn>/", views.lookup_epc_view, name="lookup-epc"),
]
