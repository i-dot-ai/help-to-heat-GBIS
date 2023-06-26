from django.core.management.base import BaseCommand

from help_to_heat.portal import epc_writer


class Command(BaseCommand):
    help = "Load EPC ratings"

    def add_arguments(self, parser):
        parser.add_argument("-u", "--url", type=str, help="The url to download")

    def handle(self, *args, **kwargs):
        url = kwargs["url"]
        sorted_filepath = epc_writer.save_url_in_chunks(url)
        rows = epc_writer.read_rows(sorted_filepath)
        epc_writer.write_rows(rows)
