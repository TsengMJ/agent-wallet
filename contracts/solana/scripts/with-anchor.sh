#!/usr/bin/env bash
set -euo pipefail

cmd="${1:-build}"

if ! command -v anchor >/dev/null 2>&1; then
  echo "@agent-wallet/contracts-solana: Anchor CLI not installed — skipping ${cmd}."
  echo "Install: https://www.anchor-lang.com/docs/installation"
  echo "Then point [provider].cluster at Ankr: https://rpc.ankr.com/solana_devnet/<API_KEY>"
  exit 0
fi

exec anchor "${cmd}"
