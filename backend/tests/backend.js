const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

const main = async () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Backend;
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
  console.log("Message count: ", account.messageCount.toString());

  await program.rpc.createMsg("Hello World", {
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("Message count: ", account.messageCount.toString());
  console.log("Message List: ", account.messageList);
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
