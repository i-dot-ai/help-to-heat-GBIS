#!/bin/sh

set -o errexit
set -o nounset

python manage.py migrate --noinput

python manage.py add_suppliers

watchmedo auto-restart --directory=./  --pattern=""*.py"" --recursive -- waitress-serve --port=$PORT --threads=8 help_to_heat.wsgi:application
