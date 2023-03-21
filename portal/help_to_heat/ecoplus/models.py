import random
import string
import uuid

from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from django_use_email_as_username.models import BaseUser, BaseUserManager

from . import utils

epc_rating_choices = tuple((letter, letter) for letter in string.ascii_letters.upper()[:8])


class SupplierChoices(utils.Choices):
    BRITISH_GAS = "British Gas"
    BULB = "Bulb"
    E_ENERGY = "E Energy"
    ECOTRICITY = "Ecotricity"
    EDF = "EDF"
    EON = "EON"
    ESB = "ESB"
    FOXGLOVE = "Foxglove"
    OCTOPUS = "Octopus"
    OVO = "OVO"
    SCOTTISH_POWER = "Scottish Power"
    SHELL = "Shell"
    UTILITA = "Utilita"
    UTILITY_WAREHOUSE = "Utility Warehouse"


def pick_random_supplier():
    return random.choice(SupplierChoices.values)


class UUIDPrimaryKeyBase(models.Model):
    class Meta:
        abstract = True

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    modified_at = models.DateTimeField(editable=False, auto_now=True)

    class Meta:
        abstract = True


class Supplier(UUIDPrimaryKeyBase, TimeStampedModel):
    name = models.CharField(max_length=256)

    def __str__(self):
        return f"<Supplier {self.name}>"


class User(BaseUser, UUIDPrimaryKeyBase):
    objects = BaseUserManager()
    username = None
    supplier = models.ForeignKey(Supplier, blank=True, null=True, on_delete=models.PROTECT)
    is_supplier_user = models.BooleanField(default=False)

    @property
    def referral_count(self):
        return self.supplier.referrals.count()

    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        return super().save(*args, **kwargs)


class Referral(UUIDPrimaryKeyBase, TimeStampedModel):
    data = models.JSONField(encoder=DjangoJSONEncoder)
    supplier = models.ForeignKey(Supplier, blank=True, null=True, on_delete=models.PROTECT, related_name="referrals")

    def save(self, *args, **kwargs):
        if not self.supplier:
            if self.data['energySupplier']:
                supplier = Supplier.objects.get(name=self.data['energySupplier'])
                self.supplier = supplier
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"<referral id={self.id} supplier={self.supplier}>"


class EpcRating(UUIDPrimaryKeyBase, TimeStampedModel):
    uprn = models.CharField(max_length=12)
    rating = models.CharField(max_length=32, choices=epc_rating_choices)
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"<EpcRating uprn={self.uprn}>"
