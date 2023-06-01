from help_to_heat.frontdoor.views import calculate_eligibility

result_map = {
    "GBIS": ("Great British Insulation scheme",),
    "ECO4": ("Energy Company Obligation 4",),
    "NONE": (),
    "BOTH": ("Great British Insulation scheme", "Energy Company Obligation 4"),
}

scenarios = (
    (
        {
            "council_tax_band": "A",
            "benefits": "Yes",
            "EPC": "D",
        },
        "NONE",
    ),
    (
        {
            "council_tax_band": "E",
        },
        "BOTH",
    ),
)


def test_eligibility():
    for data, expected in scenarios:
        result = calculate_eligibility(data)
        expected = result_map[expected]
        assert expected == result, (data, expected, result)
