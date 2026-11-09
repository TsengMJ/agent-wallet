# Agent Wallet

帳戶抽象（Account Abstraction）+ AI Agent 錢包。本 repo 是 **pnpm + Turbo monorepo**，重點在合約與 Agent 服務，前端只做薄的操作面。同時當作 [Orca](https://github.com/TsengMJ) agentic coding orchestration 的 dogfood 項目。

遠端：https://github.com/TsengMJ/agent-wallet.git

## Layout

```
apps/agent              AI agent 服務（Hono）
apps/web                簡易 Vite + React 前端
contracts/evm           Foundry（EVM / ERC-4337 方向）
contracts/solana        Anchor（Solana program）
packages/shared         鏈設定、Ankr RPC URL
```

兩個生態的 JSON-RPC 都走 **Ankr**（`https://rpc.ankr.com/<slug>`，有 key 則 `.../<slug>/<API_KEY>`）。

Foundry 只管 EVM。Solana program 用 Anchor；Ankr 提供 Solana RPC（devnet / mainnet）。

## Prerequisites

- Node 22+
- pnpm 10 (`corepack enable` 或 `npm i -g pnpm`)
- [Foundry](https://getfoundry.sh/)（EVM）
- Rust + [Anchor](https://www.anchor-lang.com/docs/installation) + Solana CLI（Solana program；沒裝也能跑 JS 與 Foundry）

```bash
export PATH="$PATH:$HOME/.foundry/bin"
cp .env.example .env          # 可選：填 ANKR_API_KEY
pnpm install
```

## Commands

```bash
pnpm test                     # 各 packege 單測（Solana 在未裝 Anchor 時 skip）
pnpm build
pnpm dev:agent                # http://127.0.0.1:8787
pnpm dev:web                  # http://127.0.0.1:5173  （/api → agent）

pnpm contracts:evm:test       # forge test
pnpm contracts:evm:build
pnpm contracts:solana:build   # 需要 Anchor
```

Fork / 部署時把 Foundry `rpc_endpoints` 或 env 指到 Ankr：

```bash
forge test --fork-url https://rpc.ankr.com/eth_sepolia
```

Solana 的 `Anchor.toml` `[provider].cluster` 預設是 `https://rpc.ankr.com/solana_devnet`。

## 現況

各塊只做了可編譯／可測的初始化：

- EVM：`AgentAccount` 佔位（owner + `execute`），下一步才接 ERC-4337
- Solana：`initialize` PDA 佔位
- Agent：`/health`、`/v1/chains`、`/v1/agent`
- Web：區塊一覽 + agent 健康檢查
