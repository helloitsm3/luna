use anchor_lang::prelude::*;

declare_id!("74NXmpQ44hWKgAcB9epSQXS3ywmSv5qMbQeBMFzwHk3W");

pub const MAX_LEN: usize = 100;

#[program]
pub mod backend2 {
    use super::*;
    pub fn start_off(_ctx: Context<StartOff>) -> ProgramResult {
        let _base_account = &mut _ctx.accounts.base_account;
        _base_account.message_count = 0;
        _base_account.proposal_count = 0;

        Ok(())
    }

    pub fn create_msg(_ctx: Context<AddMsg>, message: String) -> ProgramResult {
        let base_account = &mut _ctx.accounts.base_account;

        let item = MessageStruct {
            message: message.to_string(),
            user_address: *base_account.to_account_info().key,
        };

        base_account.message_list.push(item);
        base_account.message_count += 1;
        Ok(())
    }

    pub fn create_proposal(_ctx: Context<AddMsg>, title: String) -> ProgramResult {
        let base_account = &mut _ctx.accounts.base_account;

        let item = ProposalStruct {
            title: title.to_string(),
            creator: *base_account.to_account_info().key,
            voters: vec![],
            no_count: 0,
            yes_count: 0,
        };

        base_account.proposal_list.push(item);
        base_account.proposal_count += 1;
        Ok(())
    }

    pub fn vote_proposal(_ctx: Context<AddMsg>, title: String, vote: String) -> ProgramResult {
        let base_account = &mut _ctx.accounts.base_account;
        let account = *base_account.to_account_info().key;
        let user_vote = vote.to_lowercase();
        let index = base_account
            .proposal_list
            .iter()
            .position(|r| r.title == title)
            .unwrap();

        let proposal = &mut base_account.proposal_list[index];
        let item = VoteStruct {
            user_address: account,
            vote: vote.to_lowercase(),
        };

        proposal.voters.push(item);

        match user_vote.as_str() {
            "yes" => {
                if proposal.no_count > 0 {
                    proposal.no_count -= 1;
                    proposal.yes_count += 1;
                } else {
                    proposal.no_count = 0;
                    proposal.yes_count += 1;
                }
            }
            "no" => {
                if proposal.yes_count > 0 {
                    proposal.no_count += 1;
                    proposal.yes_count -= 1;
                } else {
                    proposal.no_count += 1;
                    proposal.yes_count = 0;
                }
            }

            _ => {
                proposal.no_count = 0;
                proposal.yes_count = 0;
            }
        }

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
pub struct AddMsg<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub message_count: u64,
    pub proposal_count: u64,
    pub proposal_list: Vec<ProposalStruct>,
    pub message_list: Vec<MessageStruct>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct MessageStruct {
    pub message: String,
    pub user_address: Pubkey,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ProposalStruct {
    pub title: String,
    pub creator: Pubkey,
    pub voters: Vec<VoteStruct>,
    pub yes_count: u64,
    pub no_count: u64,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct VoteStruct {
    pub user_address: Pubkey,
    pub vote: String,
}
