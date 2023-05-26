#!/bin/bash
CF_SPACE='sandbox'
SHOW_FRONTDOOR='yes'
DJANGO_SECRET_KEY='hgz#q0u&^8a#@@bb&%^l1$#beua2fjag5_ph*!c#_n#i=!5-zt'
LIVE_NOTIFY_API_KEY='helptoheatteamlivekey-926fd03b-2349-4c6c-864e-4e2bbc9e72db-4f3cbbbf-9203-4e77-88fb-b85ffa58b2b4'
TEAM_NOTIFY_API_KEY='helptoheatteamapikeyrp-926fd03b-2349-4c6c-864e-4e2bbc9e72db-0c72af79-691d-499a-b9dd-9489427c5e62'
NOTIFY_PLAIN_EMAIL_TEMPLATE_ID='8b40560b-0c28-4c0d-abcc-931904d8e18e'
SENTRY_DSN='https://xxxxxxxxxxxxxxxxxxxxx@xxxxxxxxx.ingest.sentry.io/xxxxxxxx'
SENTRY_ENVIRONMENT='sandbox'
UPRN_API_KEY='gemGTm74EvRSeiBTqG6LEHVhdAjpdGB1'
HTPASSWD='i-dot-ai:$apr1$peOfxpeM$ZMACnTxlMAZZaASOohejf.'
OS_API_KEY='xxxxxxxx'

# # Check that the necessary environment variables are set
# if [ -z "$CF_SPACE" ] || [ -z "$SHOW_FRONTDOOR" ]; then
#     echo "Required environment variables are not set."
#     exit 1
# fi

# Check if jq is installed
if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed.' >&2
  exit 1
fi

# Read the JSON file
JSON_FILE="govpass-env.json"
if [ ! -f "$JSON_FILE" ]; then
    echo "JSON file not found."
    exit 1
fi

# Extract the apps and their parameters for the given space
APPS=$(jq -r ".$CF_SPACE" $JSON_FILE)
if [ "$APPS" == "null" ]; then
    echo "No configuration found for space: $CF_SPACE"
    exit 1
fi

# Loop through the apps in the space
for APP in $(echo "${APPS}" | jq -r 'keys | .[]'); do
    # Get the parameters for the app
    PARAMETERS=$(echo "${APPS}" | jq -r ".$APP | .[]")
    
    # Loop through the parameters
    for PARAM in $PARAMETERS; do
        # Check if the parameter is set as an environment variable
        if [ -z "${!PARAM}" ]; then
            echo "Environment variable $PARAM is not set."
            continue
        fi

        # Set the environment variable in the cloud foundry app
        echo "Setting $PARAM for $APP in $CF_SPACE"
        echo "./cf set-env $APP $PARAM ${!PARAM} &> /dev/null"
    done
done
