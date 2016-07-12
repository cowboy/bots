#!/usr/bin/env bash

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
env_file="$script_dir/../.env"
vault_file="$script_dir/ansible/roles/services/vars/vault.yml"
tmp_file="$(mktemp /tmp/vault.XXXXXX)"

function abort() {
  echo "[ERROR] $*, aborting."
  exit 1
}

function cat_file() {
  echo "$1"
  echo "================================= FILE CONTENTS ================================"
  cat "$1"
  echo "================================================================================"
}

if [[ ! -f "$env_file" ]]; then
  abort ".env file not found"
fi

echo "Copying .env file contents to temp file..."
echo -e "---\nvault_env: |\n$(cat "$env_file" | sed 's/^/  /')" > $tmp_file

echo
echo "Encypting temp file..."
ansible-vault encrypt "$tmp_file" || abort "Unsuccessfully encrypted temp file"

echo
echo "Replacing vault file with encrypted temp file..."
mv $tmp_file "$vault_file"

echo
echo "Double-check that the following file is encryped before committing:"
cat_file "$vault_file"
