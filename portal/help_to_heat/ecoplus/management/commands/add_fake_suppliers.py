from django.core.management.base import BaseCommand
from help_to_heat.ecoplus import fakers


class Command(BaseCommand):
    help = "Add some fake data to populate database"

    def handle(self, *args, **kwargs):
        for supplier in fakers.add_fake_suppliers():
            print(f"Added: {supplier}")  # noqa: T201
