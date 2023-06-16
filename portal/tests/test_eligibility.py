from help_to_heat.frontdoor.eligibility import calculate_eligibility

result_map = {
    "GBIS": ("Great British Insulation Scheme",),
    "ECO4": ("Energy Company Obligation 4",),
    "NONE": (),
    "BOTH": ("Great British Insulation Scheme", "Energy Company Obligation 4"),
}

scenarios = (
    (
        {
            "council_tax_band": "F",
            "benefits": "Yes",
            "epc_rating": "F",
            "country": "England",
            "own_property": "Yes, I own my property and live in it",
        },
        "BOTH",
    ),
    (
        {
            "council_tax_band": "B",
            "benefits": "Yes",
            "epc_rating": "F",
            "country": "England",
            "own_property": "Yes, I own my property and live in it",
        },
        "BOTH",
    ),
    (
        {
            "council_tax_band": "G",
            "benefits": "Yes",
            "epc_rating": "F",
            "country": "England",
            "own_property": "Yes, I own my property and live in it",
        },
        "BOTH",
    ),
    (
        {
            "council_tax_band": "D",
            "benefits": "No",
            "epc_rating": "E",
            "country": "England",
            "own_property": "Yes, I own my property and live in it",
        },
        "GBIS",
    ),
    (
        {
            "council_tax_band": "D",
            "benefits": "Yes",
            "epc_rating": "D",
            "country": "England",
            "own_property": "No, I am a tenant",
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
            "own_property": "No, I am a tenant",
        },
        "GBIS",
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

unknown_epc_scenarios = (
    (
        {
            "council_tax_band": "B",
            "benefits": "Yes",
            "country": "England",
            "own_property": "Yes, I own my property and live in it",
        },
        "BOTH",
    ),
    (
        {
            "council_tax_band": "G",
            "benefits": "Yes",
            "country": "England",
            "own_property": "Yes, I own my property and live in it",
        },
        "BOTH",
    ),
    (
        {
            "council_tax_band": "D",
            "benefits": "No",
            "country": "England",
            "own_property": "Yes, I own my property and live in it",
        },
        "GBIS",
    ),
    (
        {
            "council_tax_band": "D",
            "benefits": "Yes",
            "country": "England",
            "own_property": "No, I am a tenant",
        },
        "BOTH",
    ),
    (
        {
            "council_tax_band": "F",
            "benefits": "No",
            "country": "England",
        },
        "NONE",
    ),
    (
        {
            "council_tax_band": "F",
            "benefits": "Yes",
            "country": "England",
            "own_property": "No, I am a tenant",
        },
        "BOTH",
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


def test_eligibility_unknown_epc():
    for data, expected in unknown_epc_scenarios:
        result = calculate_eligibility(data)
        expected = result_map[expected]
        assert expected == result, (data, expected, result)


eligible_council_tax = {
    "England": {
        "eligible": ("A", "B", "C", "D"),
        "ineligible": ("E", "F", "G"),
    },
    "Scotland": {
        "eligible": ("A", "B", "C", "D", "E"),
        "ineligible": ("F", "G"),
    },
    "Wales": {
        "eligible": ("A", "B", "C", "D", "E"),
        "ineligible": ("F", "G"),
    },
}


def test_mural_scenario_1():
    for country in eligible_council_tax:
        for council_tax_band in eligible_council_tax[country]["eligible"]:
            for epc_rating in ("E", "F", "G"):
                for benefits in ("Yes",):
                    session_data = {
                        "epc_rating": epc_rating,
                        "council_tax_band": council_tax_band,
                        "country": country,
                        "benefits": benefits,
                    }
                    result = calculate_eligibility(session_data)
                    expected = result_map["BOTH"]
                    assert result == expected


def test_mural_scenario_2():
    for country in eligible_council_tax:
        for council_tax_band in eligible_council_tax[country]["ineligible"]:
            for epc_rating in ("E", "F", "G"):
                for benefits in ("Yes",):
                    session_data = {
                        "epc_rating": epc_rating,
                        "council_tax_band": council_tax_band,
                        "country": country,
                        "benefits": benefits,
                    }
                    result = calculate_eligibility(session_data)
                    expected = result_map["BOTH"]
                    assert result == expected


def test_mural_scenario_3():
    for country in eligible_council_tax:
        for council_tax_band in eligible_council_tax[country]["eligible"]:
            for epc_rating in ("D", "E", "F", "G"):
                for benefits in ("No",):
                    session_data = {
                        "epc_rating": epc_rating,
                        "council_tax_band": council_tax_band,
                        "country": country,
                        "benefits": benefits,
                    }
                    result = calculate_eligibility(session_data)
                    expected = result_map["GBIS"]
                    assert result == expected

    for country in eligible_council_tax:
        for council_tax_band in eligible_council_tax[country]["eligible"]:
            for epc_rating in "D":
                for benefits in ("Yes",):
                    session_data = {
                        "epc_rating": epc_rating,
                        "council_tax_band": council_tax_band,
                        "country": country,
                        "benefits": benefits,
                    }
                    result = calculate_eligibility(session_data)
                    expected = result_map["GBIS"]
                    assert result == expected


def test_mural_scenario_3_1():
    for country in eligible_council_tax:
        for council_tax_band in eligible_council_tax[country]["ineligible"]:
            for epc_rating in "D":
                for benefits in ("Yes",):
                    session_data = {
                        "epc_rating": epc_rating,
                        "council_tax_band": council_tax_band,
                        "country": country,
                        "benefits": benefits,
                    }
                    result = calculate_eligibility(session_data)
                    expected = result_map["GBIS"]
                    assert result == expected
