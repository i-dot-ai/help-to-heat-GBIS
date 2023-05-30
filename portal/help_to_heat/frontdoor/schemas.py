import itertools

from marshmallow import Schema, fields, validate

page_order = (
    "country",
    "own-property",
    "address",
    "council-tax-band",
    "epc",
    "benefits",
    "household-income",
    "property-type",
    "property-subtype",
    "number-of-bedrooms",
    "wall-type",
    "wall-insulation",
    "loft",
    "loft-access",
    "loft-insulation",
    "summary",
    "schemes",
    "supplier",
    "contact-details",
    "confirm-and-submit",
    "success",
)

extra_pages = (
    "address-select",
    "address-manual",
)

page_prev_next_map = {
    "address-select": {"prev": "address", "next": "council-tax-band"},
    "address-manual": {"prev": "address", "next": "council-tax-band"},
    "epc-not-found": {"prev": "address", "next": "benefits"},
}

summary_map = {
    "country": "Country of property",
    "own_property": "Do you own your property?",
    "address": "Property address",
    "council_tax_band": "Council tax band",
    "epc": "Energy Performance Certificate",
    "benefits": "Is anyone in your household receiving any benefits?",
    "household_income": "Annual household income",
    "property_type": "Property type",
    "property_subtype": "Property type",
    "number_of_bedrooms": "Number of bedrooms",
    "wall_type": "Property walls",
    "wall_insulation": "Are your walls insulated?",
    "loft": "Does this property have a loft?",
    "loft_access": "Is there access to your loft?",
    "loft_insulation": "Is there 200mm of insulation in your loft?",
}

confirm_sumbit_map = {
    "supplier": "Energy supplier",
    "first_name": "First name",
    "last_name": "Last name",
    "contact_number": "Contact number",
    "email": "Email",
}

household_pages = {
    "country": ("country",),
    "own-property": ("own_property",),
    "address": ("address",),
    "council-tax-band": ("council_tax_band",),
    "epc": ("epc",),
    "benefits": ("benefits",),
    "household-income": ("household_income",),
    "property-type": ("property_type",),
    "property-subtype": ("property_subtype",),
    "number-of-bedrooms": ("number_of_bedrooms",),
    "wall-type": ("wall_type",),
    "wall-insulation": ("wall_insulation",),
    "loft": ("loft",),
    "loft-access": ("loft_access",),
    "loft-insulation": ("loft_insulation",),
}

details_pages = {
    "supplier": ("supplier",),
    "contact-details": ("first_name", "last_name", "contact_number", "email"),
}

change_page_lookup = {
    **{page_name: "summary" for page_name in household_pages},
    **{page_name: "confirm-and-submit" for page_name in details_pages},
}

question_page_lookup = {
    question: page_name
    for page_name, questions in itertools.chain(household_pages.items(), details_pages.items())
    for question in questions
}

pages = page_order + extra_pages

country_options = ("England", "Scotland", "Wales", "Northern Ireland")
own_property_options = (
    "Yes, I own my property and live in it",
    "No, I am a tenant",
    "No, I am a social housing tenant",
    "I am a property owner but lease my property to one or more tenants",
)
epc_found_options = ("Yes", "No", "I don't know", "Not found")
council_tax_band_options = ("A", "B", "C", "D", "E", "F", "G", "H")
yes_no_options = ("Yes", "No")
household_income_options = ("Less than £31,000 a year", "£31,000 or more a year")
property_type_options = ("House", "Bungalow", "Apartment, flat or masionette")
property_subtype_options_map = {
    "Flat": (
        {
            "value": "Top floor",
            "label": "Top floor",
            "hint": "Sits directly below the roof with no other flat above it",
        },
        {
            "value": "Middle floor",
            "label": "Middle floor",
            "hint": "Has another flat above, and another below",
        },
        {
            "value": "Ground floor",
            "label": "Ground floor",
            "hint": "The lowest flat in the building with no flat beneath - typically at street level but may be a basement",  # noqa E501
        },
    ),
    "Bungalow": (
        {
            "value": "Detached",
            "label": "Detached",
            "hint": "Does not share any of its walls with another house or building",
        },
        {
            "value": "Semi-detached",
            "label": "Semi-detached",
            "hint": "Is attached to one other house or building",
        },
        {
            "value": "Terraced",
            "label": "Terraced",
            "hint": "Sits in the middle with a house or building on each side",
        },
        {
            "value": "End Terrace",
            "label": "End terrace",
            "hint": "Sits at the end of a row of similar houses with one house attached to it",
        },
    ),
    "House": (
        {
            "value": "Detached",
            "label": "Detached",
            "hint": "Does not share any of its walls with another house or building",
        },
        {
            "value": "Semi-detached",
            "label": "Semi-detached",
            "hint": "Is attached to one other house or building",
        },
        {
            "value": "Terraced",
            "label": "Terraced",
            "hint": "Sits in the middle with a house or building on each side",
        },
    ),
}
number_of_bedrooms_options = ("Studio", "One bedroom", "Two bedrooms", "Three or more bedrooms")
wall_type_options = (
    "Solid walls",
    "Cavity walls",
    "Mix of solid and cavity walls",
    "I don't see my option listed",
    "I don't know",
)
wall_insulation_options = (
    "Yes they are all insulated",
    "Some are insulated, some are not",
    "No they are not insulated",
    "I don't know",
)
loft_access_options = ("Yes, there is access to my loft", "No, there is no access to my loft")
supplier_options = (
    "British Gas",
    "Bulb",
    "E Energy",
    "Ecotricity",
    "EDF",
    "EON",
    "ESB",
    "Foxglove",
    "Octopus",
    "OVO",
    "Scottish Power",
    "Shell",
    "Utilita",
    "Utility Warehouse",
)
epc_rating_options = ("A", "B", "C", "D", "E", "F", "G", "H")
loft_insulation_options = (
    "Yes, there is at least 200mm of insulation in my loft",
    "No, there is less than 200mm of insulation in my loft",
    "I don't know",
)


class SessionSchema(Schema):
    country = fields.String(validate=validate.OneOf(country_options))
    own_property = fields.String(validate=validate.OneOf(own_property_options))
    address_line_1 = fields.String()
    address_line_2 = fields.String()
    town_or_city = fields.String()
    county = fields.String()
    postcode = fields.String()
    uprn = fields.Integer()
    address = fields.String()
    council_tax_band = fields.String(validate=validate.OneOf(council_tax_band_options))
    accept_suggested_epc = fields.String(validate=validate.OneOf(epc_found_options))
    epc_rating = fields.String(validate=validate.OneOf(epc_rating_options))
    benefits = fields.String(validate=validate.OneOf(yes_no_options))
    household_income = fields.String(validate=validate.OneOf(household_income_options))
    property_type = fields.String(validate=validate.OneOf(property_type_options))
    property_subtype = fields.String(
        validate=validate.OneOf(
            tuple(item["value"] for value in property_subtype_options_map.values() for item in value)
        )
    )
    number_of_bedrooms = fields.String(validate=validate.OneOf(number_of_bedrooms_options))
    wall_type = fields.String(validate=validate.OneOf(wall_type_options))
    wall_insulation = fields.String(validate=validate.OneOf(wall_insulation_options))
    loft = fields.String(validate=validate.OneOf(yes_no_options))
    loft_access = fields.String(validate=validate.OneOf(loft_access_options))
    loft_insulation = fields.String(validate=validate.OneOf(loft_insulation_options))
    supplier = fields.String(validate=validate.OneOf(supplier_options))
    first_name = fields.String()
    last_name = fields.String()
    contact_number = fields.String()
    email = fields.String()

    class Meta:
        ordered = True


schemes_map = {
    "Yes": ("Great British Insulation scheme", "Energy Company Obligation 4"),
    "No": ("Great British Insulation scheme",),
}
