const MyToken = artifacts.require("MyToken");

contract("MyToken", (accounts) => {
  let myToken;

  beforeEach(async () => {
    myToken = await MyToken.new("My Token", "MT", 18, 1000);
  });

  it("should initialize the contract with the correct values", async () => {
    const name = await myToken.name();
    const symbol = await myToken.symbol();
    const decimals = await myToken.decimals();
    const totalSupply = await myToken.totalSupply();
    const ownerBalance = await myToken.balanceOf(accounts[0]);

    assert.equal(name, "My Token");
    assert.equal(symbol, "MT");
    assert.equal(decimals, 18);
    assert.equal(totalSupply, 1000);
    assert.equal(ownerBalance, 1000);
  });

  it("should transfer tokens from one account to another", async () => {
    const sender = accounts[0];
    const recipient = accounts[1];
    const amount = 100;
    const initialSenderBalance = await myToken.balanceOf(sender);
    const initialRecipientBalance = await myToken.balanceOf(recipient);

    await myToken.transfer(recipient, amount, { from: sender });

    const newSenderBalance = await myToken.balanceOf(sender);
    const newRecipientBalance = await myToken.balanceOf(recipient);

    assert.equal(newSenderBalance, initialSenderBalance - amount);
    assert.equal(newRecipientBalance, initialRecipientBalance + amount);
  });

  it("should not transfer more tokens than the sender has", async () => {
    const sender = accounts[0];
    const recipient = accounts[1];
    const amount = 1000;

    await expectRevert(myToken.transfer(recipient, amount, { from: sender }));
  });

  it("should not allow non-owner to mint tokens", async () => {
    const recipient = accounts[1];
    const amount = 100;

    await expectRevert(myToken.mint(recipient, amount, { from: recipient }));
  });
});
