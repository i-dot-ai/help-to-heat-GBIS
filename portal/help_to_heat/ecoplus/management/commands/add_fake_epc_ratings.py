from django.core.management.base import BaseCommand
from help_to_heat.ecoplus import fakers


class Command(BaseCommand):
    help = "Add some fake data to populate database"

    def add_arguments(self, parser):
        parser.add_argument("-n", "--number", type=int, default=256, help="How many epc ratings to add")

    def handle(self, *args, **kwargs):
        number = kwargs["number"]

        for epc_rating in fakers.add_fake_epc_ratings(number):
            print(f"Added: {epc_rating}")  # noqa: T201
