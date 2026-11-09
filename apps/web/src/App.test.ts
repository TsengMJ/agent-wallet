import { describe, expect, it } from "vitest";
import { listChains } from "@agent-wallet/shared";

describe("web chain catalog", () => {
  it("exposes both ecosystems for the dashboard", () => {
    expect(listChains("evm").length).toBeGreaterThan(0);
    expect(listChains("solana").map((c) => c.ankrSlug)).toContain("solana_devnet");
  });
});
