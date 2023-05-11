# Download the data from here: https://epc.opendatacommunities.org/domestic/search

import bz2
import csv
import pathlib

__here__ = pathlib.Path(__file__).parent
OUTPUT_DIR = __here__.parent / "data"
OUTPUT_FILEPATH = OUTPUT_DIR / "epc_ratings.csv.bz2"
DATA_DIR = __here__.parent / "all-domestic-certificates"


def collect_data():
    for filepath in DATA_DIR.glob("**/certificates.csv"):
        print(f"Processing: {filepath}")  # noqa
        with filepath.open() as f:
            reader = csv.DictReader(f)
            rows = reversed(sorted(reader, key=lambda row: row["LODGEMENT_DATE"]))
        seen_uprns = set()
        for row in rows:
            if row["UPRN"]:
                if row["UPRN"] not in seen_uprns:
                    seen_uprns.add(row["UPRN"])
                    yield {
                        "uprn": row["UPRN"],
                        "epc_rating": row["CURRENT_ENERGY_RATING"],
                        "date": row["LODGEMENT_DATE"],
                    }


def save_data(data):
    print("Sorting output")  # noqa
    rows = sorted(data, key=lambda row: row["date"])
    print(f"Writing to {OUTPUT_FILEPATH}")  # noqa
    with bz2.open(OUTPUT_FILEPATH, "wt", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=("date", "uprn", "epc_rating"))
        writer.writeheader()
        for item in rows:
            writer.writerow(item)


def main():
    save_data(collect_data())


if __name__ == "__main__":
    main()
