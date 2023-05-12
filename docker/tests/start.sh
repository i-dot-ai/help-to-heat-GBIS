#!/bin/sh

set -o errexit
set -o nounset

python manage.py migrate --noinput

python manage.py add_suppliers

echo
echo '----------------------------------------------------------------------'
echo
nosetests -v ./tests
