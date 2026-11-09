# Implementation plan

## Stage 1: Monorepo scaffold
**Goal**: pnpm/Turbo workspace with EVM Foundry, Solana Anchor, agent service, thin web, Ankr RPC helpers.
**Success Criteria**: `pnpm install`, `pnpm test`, `pnpm contracts:evm:test` pass; agent and web start.
**Status**: Complete

## Stage 2: EVM account abstraction
**Goal**: ERC-4337 smart account, EntryPoint integration, deploy scripts on Ankr-backed testnets.
**Success Criteria**: `validateUserOp` + `execute` tests; fork test against Sepolia EntryPoint.
**Status**: Not Started

## Stage 3: Solana agent program
**Goal**: Session/delegate authority PDA, spend limits, Ankr devnet deploy.
**Success Criteria**: `anchor test` on local validator; IDL consumed by agent.
**Status**: Not Started

## Stage 4: Agent runtime
**Goal**: Tool loop, policy-gated signing for EVM UserOps and Solana txs.
**Success Criteria**: Agent can quote + submit a capped transfer on a testnet via Ankr.
**Status**: Not Started

## Stage 5: Thin frontend
**Goal**: Connect the UI to agent health, balances, and intent submission.
**Success Criteria**: Browser flow: connect → ask agent → see pending/confirmed op.
**Status**: Not Started
