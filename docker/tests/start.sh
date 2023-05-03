#!/bin/sh

set -o errexit
set -o nounset

python manage.py migrate --noinput
echo
echo '----------------------------------------------------------------------'
echo

echo '================================='
echo "Run tests with FRONTDOOR disabled"
echo '================================='
SHOW_FRONTDOOR=False nosetests -v ./tests
echo
echo
echo '================================='
echo "Run tests with FRONTDOOR enabled"
echo '================================='
SHOW_FRONTDOOR=True nosetests -v ./tests
