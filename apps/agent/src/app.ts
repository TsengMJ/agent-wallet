import { Hono } from "hono";
import { cors } from "hono/cors";
import { CHAINS, type ChainDefinition, type ChainKey } from "@agent-wallet/shared";
import { type AgentConfig, chainRpc } from "./config.ts";

export function createApp(config: AgentConfig) {
  const app = new Hono();
  app.use("*", cors());

  app.get("/health", (c) =>
    c.json({
      ok: true,
      service: "agent-wallet",
      ankr: Boolean(config.ankrApiKey),
    }),
  );

  app.get("/v1/chains", (c) => {
    const chains = (Object.keys(CHAINS) as ChainKey[]).map((key) => {
      const chain: ChainDefinition = CHAINS[key];
      return {
        key,
        id: chain.id,
        name: chain.name,
        ecosystem: chain.ecosystem,
        chainId: chain.chainId,
        rpcUrl: chainRpc(key, config),
      };
    });
    return c.json({ chains });
  });

  app.get("/v1/agent", (c) =>
    c.json({
      status: "idle",
      note: "Agent runtime is scaffolded. Policy, tools, and signing land next.",
    }),
  );

  return app;
}
