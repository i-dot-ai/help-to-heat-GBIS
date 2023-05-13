from marshmallow import Schema, fields, validate

countries_options = ("England", "Scotland", "Wales", "Northern Ireland")


class CountrySchema(Schema):
    country = fields.String(validate=validate.OneOf(countries_options))
