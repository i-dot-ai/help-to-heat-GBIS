from django.core.management import call_command
from django.db import migrations


def migrate_roles(apps, schema_editor):
    User = apps.get_model("portal", "User")
    users = User.objects.all()
    for user in users:
        if user.is_service_manager:
            user.role = "service_manager"
        elif user.is_team_leader:
            user.role = "team_leader"
        elif user.is_team_member:
            user.role = "team_member"
        user.save()


class Migration(migrations.Migration):
    dependencies = [
        ("portal", "0008_user_role"),
    ]

    operations = [migrations.RunPython(migrate_roles)]
