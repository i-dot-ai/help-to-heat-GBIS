from django.core.management.base import BaseCommand

from help_to_heat.portal import fakers


class Command(BaseCommand):
    help = "Add some fake data to populate database"

    def add_arguments(self, parser):
        parser.add_argument("-n", "--number", type=int, default=128, help="How many referrals to add")

    def handle(self, *args, **kwargs):
        number = kwargs["number"]

        for referral in fakers.add_fake_referrals(number):
            print(f"Added: {referral}")  # noqa: T201
