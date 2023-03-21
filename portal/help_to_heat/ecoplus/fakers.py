import random
import string

import faker

from . import models

fake = faker.Faker(("en_GB",))


def fake_epc_ratings(number=256):
    for _ in range(number):
        yield {
            "uprn": "".join(random.choices(string.digits, k=12)),
            "rating": random.choice(models.epc_rating_choices)[0],
            "date": fake.date_between(start_date="-12y"),
        }


def add_fake_epc_ratings(number=256):
    for epc_rating_datum in fake_epc_ratings(number):
        epc_rating = models.EpcRating(**epc_rating_datum)
        epc_rating.save()
        yield epc_rating


fake_supplier_names = (
    "Springfield Power",
    "Clampett Oil",
    "Wayne Enterprises",
    "MomCorp",
    "Acme Corp",
    "CHOAM",
    "Gringotts",
    "Nakatomi Trading",
    "Stark Industries",
)


def add_fake_suppliers():
    for supplier_name in fake_supplier_names:
        supplier = models.Supplier(name=supplier_name)
        supplier.save()
        yield supplier


locations = ("England", "Scotland", "Wales")


def fake_referrals(number=128):
    for _ in range(number):
        first_name = fake.first_name()
        last_name = fake.last_name()
        data = {
            "location": random.choice(locations),
            "owningOfProperty": "Yes, I own my property and live in it",
            "address": {
                "postcode": fake.postcode(),
                "buildingNumberOrName": fake.building_number(),
            },
            "energySupplier": random.choice(fake_supplier_names),
            "personalDetails": {
                "firstName": first_name,
                "lastName": last_name,
                "email": f"{first_name}.{last_name}@example.com",
                "phoneNumber": fake.phone_number()
            },
            "addressUPRN": "".join(random.choices(string.digits, k=12)),
            "councilTaxBand": random.choice("ABCD"),
            "benefits": "Yes",
        }
        yield data


def add_fake_referrals(number=128):
    for referral_data in fake_referrals(number):
        referral = models.Referral(data=referral_data)
        referral.save()
        yield referral
