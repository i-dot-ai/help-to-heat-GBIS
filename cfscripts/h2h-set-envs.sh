#!/bin/bash
CF_SPACE='sandbox'
DJANGO_SECRET_KEY='hgz#q0u&^8a#@@bb&%^l1$#beua2fjag5_ph*!c#_n#i=!5-zt'
LIVE_NOTIFY_API_KEY='helptoheatteamlivekey'
TEAM_NOTIFY_API_KEY='helptoheatteamapikeyrp'
NOTIFY_PLAIN_EMAIL_TEMPLATE_ID='8b40560b'
OS_API_KEY='xxxxxxxx'

# # Check that the necessary environment variables are set
# if [ -z "$CF_SPACE" ] || [ -z "$SHOW_FRONTDOOR" ]; then
#     echo "Required environment variables are not set."
#     exit 1
# fi

# # Check if jq is installed
# if ! [ -x "$(command -v jq)" ]; then
#   echo 'Error: jq is not installed.' >&2
#   exit 1
# fi

# # Read the JSON file
# JSON_FILE="govpass-env.json"
# if [ ! -f "$JSON_FILE" ]; then
#     echo "JSON file not found."
#     exit 1
# fi

# # Extract the apps and their parameters for the given space
# APPS=$(jq -r ".\"$CF_SPACE\"" $JSON_FILE)
# if [ "$APPS" == "null" ]; then
#     echo "No configuration found for space: $CF_SPACE"
#     exit 1
# fi

# # Loop through the apps in the space
# for APP in $(echo "${APPS}" | jq -r 'keys | .[]'); do
#     # Get the parameters for the app
#     PARAMETERS=$(echo "${APPS}" | jq -r ".\"$APP\" | .[]")
    
#     # Loop through the parameters
#     for PARAM in $PARAMETERS; do
#         # Check if the parameter is set as an environment variable
#         if [ -z "${!PARAM}" ]; then
#             echo "Environment variable $PARAM is not set."
#             continue
#         fi

#         # Set the environment variable in the cloud foundry app
#         echo "Setting $PARAM for $APP in $CF_SPACE"
#         echo "./cf set-env $APP $PARAM ${!PARAM} &> /dev/null"
#     done
# done




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
APPS=$(jq -r ".\"$CF_SPACE\"" $JSON_FILE)
if [ "$APPS" == "null" ]; then
    echo "No configuration found for space: $CF_SPACE"
    exit 1
fi

# Loop through the apps in the space
for APP in $(echo "${APPS}" | jq -r 'keys | .[]'); do
    # Get the parameters for the app
    PARAMS=$(echo "${APPS}" | jq -r ".\"$APP\" | keys[]")
    
    # Loop through the parameters
    for PARAM in $PARAMS; do
        # Get the value from the JSON file
        DEFAULT_VALUE=$(echo "${APPS}" | jq -r ".\"$APP\".\"$PARAM\"")

        # Check if the parameter is set as an environment variable
        if [ -n "${!PARAM}" ]; then
            # If the parameter is set, use the environment variable value
            VALUE=${!PARAM}
            echo "$VALUE"
        else
            # If the parameter is not set, use the default value from the JSON file
            VALUE=$DEFAULT_VALUE
        fi

        # Set the environment variable in the cloud foundry app
        # echo "Setting $PARAM for $APP in $CF_SPACE to $VALUE"
        # cf set-env $APP $PARAM $VALUE &> /dev/null
        echo "./cf set-env ${APP}-${CF_SPACE} $PARAM $VALUE &> /dev/null"
    done
done
