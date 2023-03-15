import bz2
import csv
import pathlib

__here__ = pathlib.Path(__file__).parent
OUTPUT_DIR = __here__.parent / "data"
OUTPUT_FILEPATH = OUTPUT_DIR / "epc_ratings.csv.bz2"
DATA_DIR = __here__ / "all-domestic-certificates"


def collect_data():
    for filepath in DATA_DIR.glob("**/certificates.csv"):
        print(filepath)  #  noqa
        with filepath.open() as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row["UPRN"]:
                    yield {
                        "uprn": row["UPRN"],
                        "epc_rating": row["CURRENT_ENERGY_RATING"],
                        "date": row["LODGEMENT_DATE"],
                    }


def save_data(data):
    with bz2.open(OUTPUT_FILEPATH, "wt", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=("date", "uprn", "epc_rating"))
        writer.writeheader()
        for item in data:
            writer.writerow(item)


def main():
    save_data(collect_data())


if __name__ == "__main__":
    main()
