const MyNFT = artifacts.require("MyNFT");

contract("MyNFT", accounts => {
  let myNFT;

  beforeEach(async () => {
    myNFT = await MyNFT.new();
  });

  it("should have initial supply of zero", async () => {
    const totalSupply = await myNFT.totalSupply();
    assert(totalSupply.toNumber() === 0);
  });

  it("should allow minting of NFTs", async () => {
    const tokenId = 1;
    const uri = "https://example.com/token/1";
    await myNFT.mint(accounts[0], tokenId, uri);
    const owner = await myNFT.ownerOf(tokenId);
    assert(owner === accounts[0]);

    const totalSupply = await myNFT.totalSupply();
    assert(totalSupply.toNumber() === 1);
  });
});
