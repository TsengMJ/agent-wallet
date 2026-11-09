#!/usr/bin/env bash
set -euo pipefail
export PATH="${HOME}/.foundry/bin:${PATH}"

if ! command -v forge >/dev/null 2>&1; then
  echo "@agent-wallet/contracts-evm: forge not found."
  echo "Install Foundry: https://getfoundry.sh/  then add ~/.foundry/bin to PATH."
  exit 1
fi

exec forge "$@"
