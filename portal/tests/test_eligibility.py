from help_to_heat.frontdoor.views import calculate_eligibility

result_map = {
    "GBIS": [
        "Great British Insulation scheme",
    ],
    "ECO4": [
        "Energy Company Obligation 4",
    ],
    "NONE": [],
    "BOTH": ["Great British Insulation scheme", "Energy Company Obligation 4"],
}

scenarios = (
    (
        {
            "council_tax_band": "B",
            "benefits": "Yes",
            "epc_rating": "F",
            "country": "England",
            "own_property_options": "Yes, I own my property and live in it",
        },
        "BOTH",
    ),
    (
        {
            "council_tax_band": "G",
            "benefits": "Yes",
            "epc_rating": "F",
            "country": "England",
            "own_property_options": "Yes, I own my property and live in it",
        },
        "ECO4",
    ),
    (
        {
            "council_tax_band": "D",
            "benefits": "No",
            "epc_rating": "E",
            "country": "England",
            "own_property_options": "Yes, I own my property and live in it",
        },
        "GBIS",
    ),
    (
        {
            "council_tax_band": "D",
            "benefits": "Yes",
            "epc_rating": "D",
            "country": "England",
            "own_property_options": "No, I am a tenant",
        },
        "GBIS",
    ),
    (
        {
            "council_tax_band": "F",
            "benefits": "No",
            "epc_rating": "D",
            "country": "England",
        },
        "NONE",
    ),
    (
        {
            "council_tax_band": "F",
            "benefits": "Yes",
            "epc_rating": "D",
            "country": "England",
            "own_property_options": "No, I am a tenant",
        },
        "NONE",
    ),
    (
        {
            "council_tax_band": "F",
            "benefits": "No",
            "country": "England",
        },
        "NONE",
    ),
)


def test_eligibility():
    for data, expected in scenarios:
        result = calculate_eligibility(data)
        expected = result_map[expected]
        assert expected == result, (data, expected, result)
