use anchor_lang::prelude::*;

declare_id!("9zXjbuZi8zFRJg8xfUfkSAFKGH9EFqGwJStoaQJBrSDR");

#[program]
pub mod backend {
    use super::*;
    pub fn start_off(_ctx: Context<StartOff>) -> ProgramResult {
        let base_account = &mut _ctx.accounts.base_account;
        base_account.message_count = 0;
        Ok(())
    }

    pub fn create_msg(_ctx: Context<AddMessage>, message: String) -> ProgramResult {
        let base_account = &mut _ctx.accounts.base_account;

        let item = MessageStruct {
            message: message.to_string(),
            user_address: *base_account.to_account_info().key,
        };

        base_account.message_list.push(item);
        base_account.message_count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StartOff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddMessage<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub message_count: u64,
    pub message_list: Vec<MessageStruct>
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct MessageStruct {
    pub message: String,
    pub user_address: Pubkey,
}
