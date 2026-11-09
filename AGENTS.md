# Agent notes

pnpm + Turbo monorepo. Focus: contracts and the agent service. Frontend stays thin.

- EVM contracts: Foundry in `contracts/evm`. RPC via Ankr (`foundry.toml` `[rpc_endpoints]`).
- Solana programs: Anchor in `contracts/solana`. RPC via Ankr (`Anchor.toml` `[provider].cluster`).
- Shared chain/RPC helpers: `packages/shared`.
- Agent HTTP: `apps/agent` (Hono). Web: `apps/web` (Vite), proxies `/api` to the agent.

Do not commit `.env`, keypairs, or `contracts/solana/target/deploy/*.json`.

Initialize-only stubs live in `AgentAccount.sol` and `programs/agent-wallet`. Next real work is ERC-4337 + session/policy, then the agent runtime.
