from django.core.management.base import BaseCommand
from help_to_heat.ecoplus import models


class Command(BaseCommand):
    help = "Add the required suppliers to the database"

    def handle(self, *args, **kwargs):
        suppliers = models.SupplierChoices
        for supplier in suppliers:
            if not models.Supplier.objects.filter(name=supplier.label).exists():
                supplier = models.Supplier(name=supplier.label)
                supplier.save()
            print(f"Created or added supplier {supplier.label}")  # noqa: T201
