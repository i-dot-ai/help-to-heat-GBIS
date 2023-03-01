#!/bin/sh

set -o errexit
set -o nounset

npm start --port $PORT
