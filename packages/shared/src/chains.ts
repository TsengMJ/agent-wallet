import { ankrRpcUrl, ankrWsUrl } from "./ankr.ts";

export type Ecosystem = "evm" | "solana";

export type ChainDefinition = {
  id: string;
  name: string;
  ecosystem: Ecosystem;
  /** Ankr path slug, e.g. `eth_sepolia` or `solana_devnet`. */
  ankrSlug: string;
  /** EVM chain id. Omitted for Solana. */
  chainId?: number;
};

export const CHAINS = {
  ethereum: {
    id: "ethereum",
    name: "Ethereum",
    ecosystem: "evm",
    ankrSlug: "eth",
    chainId: 1,
  },
  sepolia: {
    id: "sepolia",
    name: "Sepolia",
    ecosystem: "evm",
    ankrSlug: "eth_sepolia",
    chainId: 11155111,
  },
  base: {
    id: "base",
    name: "Base",
    ecosystem: "evm",
    ankrSlug: "base",
    chainId: 8453,
  },
  baseSepolia: {
    id: "base-sepolia",
    name: "Base Sepolia",
    ecosystem: "evm",
    ankrSlug: "base_sepolia",
    chainId: 84532,
  },
  arbitrum: {
    id: "arbitrum",
    name: "Arbitrum One",
    ecosystem: "evm",
    ankrSlug: "arbitrum",
    chainId: 42161,
  },
  optimism: {
    id: "optimism",
    name: "Optimism",
    ecosystem: "evm",
    ankrSlug: "optimism",
    chainId: 10,
  },
  polygon: {
    id: "polygon",
    name: "Polygon",
    ecosystem: "evm",
    ankrSlug: "polygon",
    chainId: 137,
  },
  solana: {
    id: "solana",
    name: "Solana",
    ecosystem: "solana",
    ankrSlug: "solana",
  },
  solanaDevnet: {
    id: "solana-devnet",
    name: "Solana Devnet",
    ecosystem: "solana",
    ankrSlug: "solana_devnet",
  },
} as const satisfies Record<string, ChainDefinition>;

export type ChainKey = keyof typeof CHAINS;

export function listChains(ecosystem?: Ecosystem): ChainDefinition[] {
  return Object.values(CHAINS).filter(
    (chain) => ecosystem === undefined || chain.ecosystem === ecosystem,
  );
}

export function rpcUrlFor(
  chain: ChainDefinition | ChainKey,
  apiKey?: string,
): string {
  const def = typeof chain === "string" ? CHAINS[chain] : chain;
  return ankrRpcUrl(def.ankrSlug, apiKey);
}

export function wsUrlFor(
  chain: ChainDefinition | ChainKey,
  apiKey?: string,
): string {
  const def = typeof chain === "string" ? CHAINS[chain] : chain;
  return ankrWsUrl(def.ankrSlug, apiKey);
}
