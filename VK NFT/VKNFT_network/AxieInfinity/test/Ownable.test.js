const Ownable = artifacts.require("Ownable");

contract("Ownable", (accounts) => {
  let ownable;

  beforeEach(async () => {
    ownable = await Ownable.new();
  });

  it("should set owner as deployer", async () => {
    const owner = await ownable.owner();
    assert.equal(owner, accounts[0], "Owner is not deployer");
  });

  it("should transfer ownership", async () => {
    await ownable.transferOwnership(accounts[1]);
    const owner = await ownable.owner();
    assert.equal(owner, accounts[1], "Ownership transfer failed");
  });

  it("should not allow non-owners to transfer ownership", async () => {
    try {
      await ownable.transferOwnership(accounts[1], { from: accounts[1] });
      assert.fail("Non-owner was able to transfer ownership");
    } catch (err) {
      assert.include(err.message, "revert", "Error message should contain revert");
    }
  });
});
