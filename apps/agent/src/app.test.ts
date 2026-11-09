import { describe, expect, it } from "vitest";
import { createApp } from "./app.ts";
import { loadConfig } from "./config.ts";

const app = createApp(loadConfig({ AGENT_PORT: "8787", ANKR_API_KEY: "test-key" }));

describe("agent http", () => {
  it("reports health", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({
      ok: true,
      service: "agent-wallet",
      ankr: true,
    });
  });

  it("lists evm and solana chains over Ankr", async () => {
    const res = await app.request("/v1/chains");
    const body = (await res.json()) as {
      chains: { key: string; ecosystem: string; rpcUrl: string }[];
    };
    const evm = body.chains.filter((c) => c.ecosystem === "evm");
    const solana = body.chains.filter((c) => c.ecosystem === "solana");
    expect(evm.length).toBeGreaterThan(0);
    expect(solana.length).toBeGreaterThan(0);
    expect(body.chains.every((c) => c.rpcUrl.includes("rpc.ankr.com"))).toBe(true);
  });
});
