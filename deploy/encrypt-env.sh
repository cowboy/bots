#!/usr/bin/env bash

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
env_file="$script_dir/../.env"
vault_file="$script_dir/ansible/roles/services/vars/vault.yml"

if [[ ! -f "$env_file" ]]; then
  echo "Error: .env file not found."
  exit 1
fi

echo "Copying .env file to vault file..."
echo -e "---\nvault_env: |\n$(cat "$env_file" | sed 's/^/  /')" > "$vault_file"

echo "Encypting vault file..."
ansible-vault encrypt "$vault_file"
