from marshmallow import Schema, fields, validate

country_options = ("England", "Scotland", "Wales", "Northern Ireland")
own_property_options = (
    "Yes, I own my property and live in it",
    "No, I am a tenant",
    "No, I am a social housing tenant",
    "I am a property owner but lease my property to one or more tenants",
)


class CountrySchema(Schema):
    country = fields.String(validate=validate.OneOf(country_options))


class OwnPropertySchema(Schema):
    own_property = fields.String(validate=validate.OneOf(own_property_options))
