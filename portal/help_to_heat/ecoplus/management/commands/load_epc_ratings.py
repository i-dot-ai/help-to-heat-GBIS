import bz2
import csv
import datetime
import pathlib
import subprocess

import httpx
from django.core.management.base import BaseCommand
from help_to_heat.ecoplus import models

DATA_DIR = pathlib.Path("./new_data/")
CHUNK_SIZE = 16 * 1024


def save_url_in_chunks(url):
    decompressor = bz2.BZ2Decompressor()
    filename = pathlib.Path(url).stem
    filepath = DATA_DIR / filename
    if not filepath.exists():
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with filepath.open("wb") as f:
            with httpx.stream("GET", url) as response:
                for chunk in response.iter_bytes(CHUNK_SIZE):
                    text = decompressor.decompress(chunk)
                    f.write(text)
    sort_args = ("sort", "-u", "-o", str(filepath), str(filepath))
    subprocess.run(sort_args)
    return filepath


def read_rows(filepath):
    with filepath.open() as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row


def write_rows(rows):
    if models.EpcRating.objects.exists():
        latest_date = models.EpcRating.objects.latest("date").date
    else:
        latest_date = datetime.date(1970, 1, 1)
    for row in rows:
        if row["date"] > latest_date:
            epc_rating = models.EpcRating.create(**row)
        elif row["date"] == latest_date:
            epc_rating, created = models.EpcRating.get_or_create(**row)


class Command(BaseCommand):
    help = "Load EPC ratings"

    def add_arguments(self, parser):
        parser.add_argument("-u", "--url", type=str, help="The url to download")

    def handle(self, *args, **kwargs):
        url = kwargs["url"]
        filepath = save_url_in_chunks(url)
        rows = read_rows(filepath)
        write_rows(rows)
