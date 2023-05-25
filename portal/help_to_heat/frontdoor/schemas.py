from marshmallow import Schema, fields, validate

page_map = {
    "country": "Which country is your property located in?",
    "own-property": "Do you own your property?",
    "address": "What is the address of your property?",
    "address-select": "What is the address of your property?",
    "council-tax-band": "What is the council tax band of your property?",
    "benefits": "Is anyone in your household receiving any benefits?",
    "household-income": "What is your annual household income?",
    "property-type": "What kind of property do you have?",
    "property-subtype": "What kind of property do you have?",
    "number-of-bedrooms": "Number of bedrooms",
    "wall-type": "What kind of walls does your property have?",
    "wall-insulation": "Are your walls insulated?",
    "loft": "Does this property have a loft?",
    "loft-access": "Is there access to your loft?",
    "summary": "",
    "schemes": "",
    "supplier": "Energy supplier",
    "contact-details": "Contact details",
    "confirm-and-submit": "",
    "success": "",
}

question_map = {
    "country": "Which country is your property located in?",
    "own_property": "Do you own your property?",
    "address": "What is the address of your property?",
    "council_tax_band": "What is the council tax band of your property?",
    "benefits": "Is anyone in your household receiving any benefits?",
    "household_income": "What is your annual household income?",
    "property_type": "What kind of property do you have?",
    "number_of_bedrooms": "Number of bedrooms",
    "wall_type": "What kind of walls does your property have?",
    "wall_insulation": "Are your walls insulated?",
    "loft": "Does this property have a loft?",
    "loft_access": "Is there access to your loft?",
    "supplier": "Energy supplier",
    "first_name": "First name",
    "last_name": "Last name",
    "contact_number": "Contact number",
    "email": "Email",
}


household_pages = (
    "country",
    "own-property",
    "address",
    "address-select",
    "council-tax-band",
    "benefits",
    "household-income",
    "property-type",
    "property-subtype",
    "number-of-bedrooms",
    "wall-type",
    "wall-insulation",
    "loft",
    "loft-access",
)

details_pages = (
    "supplier",
    "contact-details",
)

change_page_lookup = {
    **{page_name: "summary" for page_name in household_pages},
    **{page_name: "confirm-and-submit" for page_name in details_pages},
}

pages = tuple(page_map.keys())

country_options = ("England", "Scotland", "Wales", "Northern Ireland")
own_property_options = (
    "Yes, I own my property and live in it",
    "No, I am a tenant",
    "No, I am a social housing tenant",
    "I am a property owner but lease my property to one or more tenants",
)
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


class SessionSchema(Schema):
    country = fields.String(validate=validate.OneOf(country_options))
    own_property = fields.String(validate=validate.OneOf(own_property_options))
    address_line_1 = fields.String()
    postcode = fields.String()
    uprn = fields.Integer()
    address = fields.String()
    council_tax_band = fields.String(validate=validate.OneOf(council_tax_band_options))
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
