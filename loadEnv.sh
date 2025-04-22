
#!/bin/bash

# Usage: ./upload_secrets.sh <repo_name> <env_file_path>
# Example: ./upload_secrets.sh my-repo .env

REPO=$1
ENV_FILE=$2

# Ensure both arguments are provided
if [ -z "$REPO" ] || [ -z "$ENV_FILE" ]; then
  echo "Usage: ./upload_secrets.sh <repo_name> <env_file_path>"
  exit 1
fi

# Check if the .env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo ".env file not found: $ENV_FILE"
  exit 1
fi

# Read each line from the .env file and set it as a GitHub secret
while IFS='=' read -r key value; do
  # Ignore empty lines or comments
  if [[ -z "$key" || "$key" =~ ^# ]]; then
    continue
  fi

  # Remove leading/trailing spaces
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  # Set secret in GitHub using GitHub CLI (gh)
  echo "Setting secret $key for repo $REPO"

  # GitHub CLI command to set the secret
  gh secret set "$key" --repo "$REPO" --body "$value"
done < "$ENV_FILE"

echo "Secrets have been uploaded successfully."
