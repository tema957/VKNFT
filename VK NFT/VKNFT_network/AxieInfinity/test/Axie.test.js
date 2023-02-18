const Axie = artifacts.require("Axie");

contract("Axie", accounts => {
  let axieInstance;

  beforeEach(async () => {
    axieInstance = await Axie.new();
  });

  it("should have an owner", async () => {
    const owner = await axieInstance.owner();
    assert.isTrue(owner !== 0);
  });

  it("should mint a new Axie", async () => {
    const tokenId = 1;
    const genes = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const birthDate = Date.now();

    await axieInstance.mintAxie(accounts[0], tokenId, genes, birthDate);
    const owner = await axieInstance.ownerOf(tokenId);

    assert.equal(owner, accounts[0], "Axie was not minted correctly");
  });

  it("should transfer an Axie to a new owner", async () => {
    const tokenId = 1;
    const genes = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const birthDate = Date.now();

    await axieInstance.mintAxie(accounts[0], tokenId, genes, birthDate);
    await axieInstance.transferFrom(accounts[0], accounts[1], tokenId);
    const newOwner = await axieInstance.ownerOf(tokenId);

    assert.equal(newOwner, accounts[1], "Axie was not transferred correctly");
  });
});
