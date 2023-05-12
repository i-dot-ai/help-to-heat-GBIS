from django.core.management.base import BaseCommand
from help_to_heat.ecoplus import models


class Command(BaseCommand):
    help = "Add the required suppliers to the database"

    def handle(self, *args, **kwargs):
        supplier_choices = models.SupplierChoices
        for supplier_choice in supplier_choices:
            if not models.Supplier.objects.filter(name=supplier_choice.label).exists():
                supplier = models.Supplier(name=supplier_choice.label)
                supplier.save()
                print(f"Created or added supplier {supplier.name}")  # noqa: T201
