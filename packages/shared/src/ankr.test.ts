import { describe, expect, it } from "vitest";
import { ankrRpcUrl, ankrWsUrl } from "./ankr.ts";
import { CHAINS, listChains, rpcUrlFor } from "./chains.ts";

describe("ankrRpcUrl", () => {
  it("uses the public endpoint when no key is set", () => {
    expect(ankrRpcUrl("eth")).toBe("https://rpc.ankr.com/eth");
  });

  it("appends the API key to the path", () => {
    expect(ankrRpcUrl("solana_devnet", "abc123")).toBe(
      "https://rpc.ankr.com/solana_devnet/abc123",
    );
  });

  it("ignores blank keys", () => {
    expect(ankrRpcUrl("base", "  ")).toBe("https://rpc.ankr.com/base");
  });

  it("derives the websocket URL from the same slug", () => {
    expect(ankrWsUrl("eth", "k")).toBe("wss://rpc.ankr.com/eth/k");
  });
});

describe("chains", () => {
  it("covers both ecosystems", () => {
    expect(listChains("evm").every((c) => c.ecosystem === "evm")).toBe(true);
    expect(listChains("solana").map((c) => c.id)).toEqual([
      "solana",
      "solana-devnet",
    ]);
  });

  it("builds Ankr RPC URLs from chain keys", () => {
    expect(rpcUrlFor("sepolia")).toBe("https://rpc.ankr.com/eth_sepolia");
    expect(rpcUrlFor(CHAINS.solanaDevnet, "k")).toBe(
      "https://rpc.ankr.com/solana_devnet/k",
    );
  });
});
