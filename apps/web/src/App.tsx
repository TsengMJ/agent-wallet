import { CHAINS, rpcUrlFor, type ChainKey } from "@agent-wallet/shared";
import { useEffect, useState } from "react";
import "./App.css";

type Health = { ok: boolean; service: string; ankr: boolean } | { error: string };

const BLOCKS = [
  {
    title: "EVM contracts",
    path: "contracts/evm",
    tool: "Foundry + Ankr",
    note: "AgentAccount stub. ERC-4337 next.",
  },
  {
    title: "Solana contracts",
    path: "contracts/solana",
    tool: "Anchor + Ankr",
    note: "PDA agent account stub.",
  },
  {
    title: "Agent service",
    path: "apps/agent",
    tool: "Hono on :8787",
    note: "Health + chain RPC catalog.",
  },
] as const;

export function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const chains = Object.keys(CHAINS) as ChainKey[];

  useEffect(() => {
    fetch("/api/health")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setHealth((await res.json()) as Health);
      })
      .catch((err: unknown) => {
        setHealth({ error: err instanceof Error ? err.message : "offline" });
      });
  }, []);

  return (
    <main className="page">
      <header>
        <p className="eyebrow">account abstraction / agent wallet</p>
        <h1>Agent Wallet</h1>
        <p className="lede">
          Monorepo dogfood for Orca: contracts and the agent service first, a thin UI on
          top. RPC for both EVM and Solana goes through Ankr.
        </p>
      </header>

      <section className="grid">
        {BLOCKS.map((block) => (
          <article key={block.path} className="card">
            <h2>{block.title}</h2>
            <p className="mono">{block.path}</p>
            <p>{block.tool}</p>
            <p className="muted">{block.note}</p>
          </article>
        ))}
      </section>

      <section className="card health">
        <h2>Agent</h2>
        {health === null ? (
          <p className="muted">checking /health …</p>
        ) : "error" in health ? (
          <p className="warn">offline — start with `pnpm dev:agent`. {health.error}</p>
        ) : (
          <p>
            {health.service} ok · ankr key {health.ankr ? "set" : "public endpoints"}
          </p>
        )}
      </section>

      <section>
        <h2>Chains</h2>
        <div className="table">
          {chains.map((key) => {
            const chain = CHAINS[key];
            return (
              <div key={key} className="row">
                <span>{chain.name}</span>
                <span className="muted">{chain.ecosystem}</span>
                <span className="mono">{rpcUrlFor(key)}</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
