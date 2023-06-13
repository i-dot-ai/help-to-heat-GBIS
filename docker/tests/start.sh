#!/bin/sh

set -o errexit
set -o nounset

python manage.py migrate --noinput

python manage.py add_suppliers

echo
echo '----------------------------------------------------------------------'
echo
nosetests -v ./tests


echo
echo '----------------------------------------------------------------------'
echo
echo 'Test Basic Auth'
BASIC_AUTH="mr-flibble:flim-flam-flooble" nosetests -v ./tests/test_basic_auth.py
