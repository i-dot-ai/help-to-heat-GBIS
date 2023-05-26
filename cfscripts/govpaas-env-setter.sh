#!/bin/bash

# Check if jq is installed
if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed.' >&2
  exit 1
fi

# Read the JSON file
JSON_FILE="govpaas-envs.json"
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
        VAR_NAME=$(echo "${APPS}" | jq -r ".\"$APP\".\"$PARAM\"")

        # Check if the variable (specified as "value" in JSON) is set as an environment variable
        if [ -n "${!VAR_NAME}" ]; then
            # If the variable is set, use the environment variable value
            VALUE=${!VAR_NAME}
        else
            # If the variable is not set, use the variable name from the JSON file as value
            VALUE=$VAR_NAME
        fi

        # Set the environment variable in the cloud foundry app
        echo "Setting $PARAM for ${APP}-${CF_SPACE} in $CF_SPACE to $VALUE"
        # cf set-env $APP $PARAM $VALUE &> /dev/null
        ./cf set-env ${APP}-${CF_SPACE} $PARAM $VALUE &> /dev/null
    done
done

