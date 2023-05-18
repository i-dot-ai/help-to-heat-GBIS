from marshmallow import Schema, fields, validate

page_map = {
    "country": "Which country is your property located in?",
    "own-property": "Do you own your property?",
    "address": "What is the address of your property?",
    "council-tax-band": "What is the council tax band of your property?",
    "benefits": "Is anyone in your household receiving any benefits?",
    "household-income": "What is your annual household income?",
    "property-type": "What kind of property do you have?",
    "number-of-bedrooms": "Number of bedrooms",
    "wall-type": "What kind of walls does your property have?",
    "wall-insulation": "Are your walls insulated?",
    "loft": "Does this property have a loft?",
    "loft-access": "Is there access to your loft?",
    "summary": "",
    "schemes": "",
    "supplier": "",
    "contact-details": "",
    "success": "",
}

household_pages = (
    "country",
    "own-property",
    "address",
    "council-tax-band",
    "benefits",
    "household-income",
    "property-type",
    "number-of-bedrooms",
    "wall-type",
    "wall-insulation",
    "loft",
    "loft-access",
)


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
    council_tax_band = fields.String(validate=validate.OneOf(council_tax_band_options))
    benefits = fields.String(validate=validate.OneOf(yes_no_options))
    household_income = fields.String(validate=validate.OneOf(household_income_options))
    property_type = fields.String(validate=validate.OneOf(property_type_options))
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


schemes_map = {
    "Yes": ("Great British Insulation scheme", "Energy Company Obligation 4"),
    "No": ("Great British Insulation scheme",),
}
