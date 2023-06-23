from django.core.management import call_command
from django.db import migrations


def migrate_roles(apps, schema_editor):
    User = apps.get_model("portal", "User")
    users = User.objects.all()
    for user in users:
        if user.role.lower().endswith("manager"):
            user.role = "SERVICE_MANAGER"
        elif user.role.lower().endswith("leader"):
            user.role = "TEAM_LEADER"
        elif user.role.lower().endswith("member"):
            user.role = "TEAM_MEMBER"
        user.save()


class Migration(migrations.Migration):
    dependencies = [
        ("portal", "0010_auto_20230622_1005"),
    ]

    operations = [migrations.RunPython(migrate_roles)]
