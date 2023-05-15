from marshmallow import Schema, fields, validate

country_options = ("England", "Scotland", "Wales", "Northern Ireland")


class CountrySchema(Schema):
    country = fields.String(validate=validate.OneOf(country_options))
