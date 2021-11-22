const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const main = async () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Backend2;
  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.startOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("Signature: ", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);

  // CREATING MESSAGES
  await program.rpc.createMsg("Hello", {
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });

  // Creating Proposal
  await program.rpc.createProposal("Would you like test proposal to be implemented?", {
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });

  // await program.rpc.vote("Would you like test proposal to be implemented?", 1, {
  //   accounts: {
  //     baseAccount: baseAccount.publicKey,
  //   },
  // });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log(`Proposal Count: ${account.proposalCount} `, account.proposalList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
