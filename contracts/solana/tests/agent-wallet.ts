import * as anchor from "@coral-xyz/anchor";
import { type Program } from "@coral-xyz/anchor";
import { expect } from "chai";

// Generated after `anchor build`. Kept loose until the IDL exists.
type AgentWallet = anchor.Idl;

describe("agent-wallet", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AgentWallet as Program<AgentWallet>;

  it("initializes an agent account PDA", async () => {
    const authority = provider.wallet.publicKey;
    const [agentPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("agent"), authority.toBuffer()],
      program.programId,
    );

    await program.methods
      .initialize()
      .accounts({
        authority,
        agentAccount: agentPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const account = await (program.account as any).agentAccount.fetch(agentPda);
    expect(account.authority.toBase58()).to.equal(authority.toBase58());
  });
});
