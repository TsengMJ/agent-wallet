use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

pub const AGENT_SEED: &[u8] = b"agent";

#[program]
pub mod agent_wallet {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.agent_account;
        account.authority = ctx.accounts.authority.key();
        account.bump = ctx.bumps.agent_account;
        Ok(())
    }
}

#[account]
pub struct AgentAccount {
    pub authority: Pubkey,
    pub bump: u8,
}

impl AgentAccount {
    pub const SPACE: usize = 8 + 32 + 1;
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = AgentAccount::SPACE,
        seeds = [AGENT_SEED, authority.key().as_ref()],
        bump
    )]
    pub agent_account: Account<'info, AgentAccount>,
    pub system_program: Program<'info, System>,
}
