import string

from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from django_use_email_as_username.models import BaseUser, BaseUserManager
from help_to_heat import utils

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


SUPPLIER_VALUE_MAPPING = {
    "british-gas": SupplierChoices.BRITISH_GAS,
    "bulb": SupplierChoices.BULB,
    "e-energy": SupplierChoices.E_ENERGY,
    "ecotricity": SupplierChoices.ECOTRICITY,
    "edf": SupplierChoices.EDF,
    "eon": SupplierChoices.EON,
    "esb": SupplierChoices.ESB,
    "foxglove": SupplierChoices.FOXGLOVE,
    "octopus": SupplierChoices.OCTOPUS,
    "ovo": SupplierChoices.OVO,
    "scottish-power": SupplierChoices.SCOTTISH_POWER,
    "shell": SupplierChoices.SHELL,
    "utilita": SupplierChoices.UTILITA,
    "utility-warehouse": SupplierChoices.UTILITY_WAREHOUSE,
}


class Supplier(utils.UUIDPrimaryKeyBase, utils.TimeStampedModel):
    name = models.CharField(max_length=256, unique=True)
    is_disabled = models.BooleanField(default=False, null=False, blank=False)

    def __str__(self):
        return f"<Supplier {self.name}>"


class User(BaseUser, utils.UUIDPrimaryKeyBase):
    objects = BaseUserManager()
    username = None
    full_name = models.CharField(max_length=255, blank=True, null=True)
    supplier = models.ForeignKey(Supplier, blank=True, null=True, on_delete=models.PROTECT)
    is_supplier_admin = models.BooleanField(default=False)
    is_team_leader = models.BooleanField(default=False)
    is_team_member = models.BooleanField(default=False)
    last_token_sent_at = models.DateTimeField(editable=False, blank=True, null=True)
    invited_at = models.DateTimeField(default=None, blank=True, null=True)
    invite_accepted_at = models.DateTimeField(default=None, blank=True, null=True)

    @property
    def referral_count(self):
        return self.supplier.referrals.count()

    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        return super().save(*args, **kwargs)


class ReferralDownload(utils.UUIDPrimaryKeyBase, utils.TimeStampedModel):
    file_name = models.CharField(max_length=255, blank=True, null=True)
    last_downloaded_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.PROTECT)


class Referral(utils.UUIDPrimaryKeyBase, utils.TimeStampedModel):
    data = models.JSONField(encoder=DjangoJSONEncoder)
    supplier = models.ForeignKey(Supplier, blank=True, null=True, on_delete=models.PROTECT, related_name="referrals")
    session_id = models.UUIDField(editable=False, blank=True, null=True, unique=True)
    referral_download = models.ForeignKey(
        ReferralDownload,
        blank=True,
        null=True,
        default=None,
        on_delete=models.PROTECT,
        related_name="referral_download",
    )

    def save(self, *args, **kwargs):
        if not self.supplier:
            if self.data["energySupplier"]:
                selected_supplier = SUPPLIER_VALUE_MAPPING[self.data["energySupplier"]]
                selected_supplier_name = selected_supplier.label
                supplier = Supplier.objects.get(name=selected_supplier_name)
                self.supplier = supplier
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"<referral id={self.id} supplier={self.supplier}>"


class EpcRating(utils.TimeStampedModel):
    uprn = models.CharField(max_length=12, primary_key=True)
    rating = models.CharField(max_length=32, choices=epc_rating_choices)
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"<EpcRating uprn={self.uprn}>"


class PasswordResetRequest(utils.UUIDPrimaryKeyBase, utils.TimeStampedModel):
    user = models.ForeignKey(User, blank=False, null=False, on_delete=models.CASCADE, related_name="reset_requests")
    reset_sent_at = models.DateTimeField(editable=False, auto_now_add=True)
    one_time_password = models.CharField(max_length=128)
    is_completed = models.BooleanField(null=False, blank=False, default=False)
    is_abandoned = models.BooleanField(null=False, blank=False, default=False)
