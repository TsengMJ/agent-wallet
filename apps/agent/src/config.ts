import { rpcUrlFor, type ChainKey } from "@agent-wallet/shared";

export type AgentConfig = {
  host: string;
  port: number;
  ankrApiKey: string | undefined;
};

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AgentConfig {
  return {
    host: env.AGENT_HOST ?? "127.0.0.1",
    port: Number(env.AGENT_PORT ?? 8787),
    ankrApiKey: env.ANKR_API_KEY?.trim() || undefined,
  };
}

export function chainRpc(chain: ChainKey, config: AgentConfig): string {
  const override = envRpcOverride(chain);
  return override ?? rpcUrlFor(chain, config.ankrApiKey);
}

function envRpcOverride(chain: ChainKey): string | undefined {
  const map: Record<ChainKey, string | undefined> = {
    ethereum: process.env.ETH_RPC_URL,
    sepolia: process.env.SEPOLIA_RPC_URL,
    base: process.env.BASE_RPC_URL,
    baseSepolia: process.env.BASE_SEPOLIA_RPC_URL,
    arbitrum: process.env.ARBITRUM_RPC_URL,
    optimism: process.env.OPTIMISM_RPC_URL,
    polygon: process.env.POLYGON_RPC_URL,
    solana: process.env.SOLANA_RPC_URL,
    solanaDevnet: process.env.SOLANA_DEVNET_RPC_URL,
  };
  return map[chain]?.trim() || undefined;
}