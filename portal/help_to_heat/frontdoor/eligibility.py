import functools

from . import schemas

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


def filter_scheme_names(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        result = func(*args, **kwargs)
        return tuple(schemas.schemes_map[scheme] for scheme in result)

    return _inner


@filter_scheme_names
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
    selected_epc = session_data.get("epc_rating", "Unknown")
    selected_council_tax_band = session_data.get("council_tax_band")
    selected_country = session_data.get("country")
    selected_benefits = session_data.get("benefits")
    eligible_for_eco4 = selected_benefits == "Yes" and (selected_epc in ("E", "F", "G", "Unknown", "Not found"))

    # A quick check for outlying cases of GBIS eligibility where EPC doesn't apply
    if selected_epc in ("D", "Unknown", "Not found") and selected_benefits == "Yes":
        if eligible_for_eco4:
            return ("GBIS", "ECO4")
        else:
            return ("GBIS",)

    # Immediately excluded from both GBIS and ECO4
    if selected_epc in ("A", "B", "C"):
        return ()

    # Check eligible for GBIS
    if selected_council_tax_band not in eligible_council_tax[selected_country]:
        if selected_epc in ("E", "F", "G", "Unknown", "Not found") and selected_benefits == "Yes":
            if eligible_for_eco4:
                return ("GBIS", "ECO4")
            else:
                return ("GBIS",)
        else:
            return tuple()
    else:
        if (selected_benefits == "No") and (selected_epc in ("D", "E", "F", "G", "Unknown", "Not found")):
            if eligible_for_eco4:
                return ("GBIS", "ECO4")
            else:
                return ("GBIS",)
        elif (selected_benefits == "Yes") and (selected_epc in ("E", "F", "G", "Unknown", "Not found")):
            if eligible_for_eco4:
                return ("GBIS", "ECO4")
            else:
                return ("GBIS",)
        else:
            return tuple()
