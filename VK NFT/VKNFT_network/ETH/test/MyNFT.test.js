const MyNFT = artifacts.require("MyNFT");

contract("MyNFT", (accounts) => {
  let myNFT;

  beforeEach(async () => {
    myNFT = await MyNFT.new("My NFT", "NFT");
  });

  it("should mint an NFT with a unique ID", async () => {
    const tokenId = 1;
    await myNFT.mint(accounts[1], tokenId, { from: accounts[0] });
    const owner = await myNFT.ownerOf(tokenId);
    assert.equal(owner, accounts[1]);
  });

  it("should not mint an NFT with an existing ID", async () => {
    const tokenId = 1;
    await myNFT.mint(accounts[1], tokenId, { from: accounts[0] });
    await expectRevert(myNFT.mint(accounts[2], tokenId, { from: accounts[0] }));
  });

  it("should transfer ownership of an NFT", async () => {
    const tokenId = 1;
    await myNFT.mint(accounts[1], tokenId, { from: accounts[0] });
    await myNFT.transferFrom(accounts[1], accounts[2], tokenId, { from: accounts[1] });
    const newOwner = await myNFT.ownerOf(tokenId);
    assert.equal(newOwner, accounts[2]);
  });
});
