from django.core.management.base import BaseCommand
from django.utils import timezone
from help_to_heat.portal import models


class Command(BaseCommand):
    help = "Add a service manager to the database"

    def add_arguments(self, parser):
        parser.add_argument("-e", "--email", type=str, help="The email of the user")

    def handle(self, *args, **kwargs):
        email = kwargs["email"]
        user = models.User(email=email)
        user.is_supplier_admin = True
        user.invited_at = timezone.now()
        user.invite_accepted_at = timezone.now()
        user.save()
