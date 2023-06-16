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
    epc_rating = session_data.get("epc_rating", "Unknown")
    council_tax_band = session_data.get("council_tax_band")
    country = session_data.get("country")
    benefits = session_data.get("benefits")
    eligible_for_eco4 = benefits == "Yes" and (epc_rating in ("E", "F", "G", "Unknown", "Not found"))

    # A quick check for outlying cases of GBIS eligibility where EPC doesn't apply
    if epc_rating in ("D", "Unknown", "Not found") and benefits == "Yes":
        if eligible_for_eco4:
            return ("GBIS", "ECO4")
        else:
            return ("GBIS",)

    # Immediately excluded from both GBIS and ECO4
    if epc_rating in ("A", "B", "C"):
        return ()

    # Check eligible for GBIS
    if council_tax_band not in eligible_council_tax[country]:
        if epc_rating in ("E", "F", "G", "Unknown", "Not found") and benefits == "Yes":
            if eligible_for_eco4:
                return ("GBIS", "ECO4")
            else:
                return ("GBIS",)
        else:
            return tuple()
    else:
        if (benefits == "No") and (epc_rating in ("D", "E", "F", "G", "Unknown", "Not found")):
            if eligible_for_eco4:
                return ("GBIS", "ECO4")
            else:
                return ("GBIS",)
        elif (benefits == "Yes") and (epc_rating in ("E", "F", "G", "Unknown", "Not found")):
            if eligible_for_eco4:
                return ("GBIS", "ECO4")
            else:
                return ("GBIS",)
        else:
            return tuple()
