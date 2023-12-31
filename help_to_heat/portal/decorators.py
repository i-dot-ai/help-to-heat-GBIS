from django.contrib.auth.decorators import user_passes_test

requires_service_manager = user_passes_test(
    lambda user: (user.is_authenticated and user.is_service_manager and user.is_active),
    login_url="portal:unauthorised",
)


requires_team_leader = user_passes_test(
    lambda user: (user.is_authenticated and user.is_team_leader and user.supplier and user.is_active),
    login_url="portal:unauthorised",
)


requires_team_member = user_passes_test(
    lambda user: (user.is_authenticated and user.is_team_member and user.supplier and user.is_active),
    login_url="portal:unauthorised",
)


requires_team_leader_or_member = user_passes_test(
    lambda user: (
        user.is_authenticated and (user.is_team_leader or user.is_team_member) and user.supplier and user.is_active
    ),
    login_url="portal:unauthorised",
)
