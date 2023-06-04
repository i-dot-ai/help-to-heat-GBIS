from . import schemas


def calculate_eligibility(session_data):
    """
    Calculate which schemes the user is able to use.
    The logic is as follows:
    EPC A-C are not eligible at all
    ECO4 eligibility is calculated with the user being on benefits with a low EPC rating of E-G
    GBIS is calculated with the user being in an acceptable council tax bracket, and an EPC rating that matches
    :param session_data:
    :return: A tuple of which schemes the person is eligible for, if any
    """
    selected_epc = session_data.get("epc_rating")
    property_status = session_data.get("own_property_options")
    selected_council_tax_band = session_data.get("council_tax_band")
    selected_country = session_data.get("country")
    selected_benefits = session_data.get("benefits")
    eligible_for_eco4 = selected_benefits == "Yes" and selected_epc in ("E", "F", "G")

    eligible_council_tax = {
        "England": (
            "A",
            "B",
            "C",
            "D",
        ),
        "Scotland": (
            "A",
            "B",
            "C",
            "D",
            "E",
        ),
        "Wales": (
            "A",
            "B",
            "C",
            "D",
            "E",
        ),
    }

    # Immediately excluded from both
    if selected_epc in (
        "A",
        "B",
        "C",
    ):
        return ()

    # not eligible for GBIS so check ECO4
    if selected_council_tax_band not in eligible_council_tax[selected_country]:
        if eligible_for_eco4:
            return list(schemas.schemes_map[scheme] for scheme in ("ECO4",))
        else:
            return list()
    else:
        if selected_epc in ("D",) and property_status == "No, I am a tenant" and selected_benefits == "Yes":
            if eligible_for_eco4:
                return list(
                    schemas.schemes_map[scheme]
                    for scheme in (
                        "GBIS",
                        "ECO4",
                    )
                )
            else:
                return list(schemas.schemes_map[scheme] for scheme in ("GBIS",))
        elif selected_benefits == "No" and selected_epc in ("D", "E", "F", "G"):
            if eligible_for_eco4:
                return list(
                    schemas.schemes_map[scheme]
                    for scheme in (
                        "GBIS",
                        "ECO4",
                    )
                )
            else:
                return list(schemas.schemes_map[scheme] for scheme in ("GBIS",))
        elif eligible_for_eco4 and selected_council_tax_band in eligible_council_tax[selected_country]:
            return list(
                schemas.schemes_map[scheme]
                for scheme in (
                    "GBIS",
                    "ECO4",
                )
            )
        else:
            return list()
