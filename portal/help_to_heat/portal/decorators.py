from django.contrib.auth.decorators import user_passes_test


def requires_service_manager(func):
    return user_passes_test(
        lambda user: user.is_authenticated and user.is_supplier_admin and user.is_active,
        login_url="portal:unauthorised",
    )


def requires_team_leader(func):
    return user_passes_test(
        lambda user: user.is_authenticated and user.is_team_leader and user.supplier and user.is_active,
        login_url="portal:unauthorised",
    )


def requires_team_member(func):
    return user_passes_test(
        lambda user: user.is_authenticated and user.is_team_member and user.supplier and user.is_active,
        login_url="portal:unauthorised",
    )
