const { expect } = require("chai");

describe("MyToken", function() {
  let owner, addr1, addr2;
  let MyToken;

  beforeEach(async function() {
    [owner, addr1, addr2] = await ethers.getSigners();
    MyToken = await ethers.getContractFactory("MyToken");
  });

  it("Should return the correct name and symbol", async function() {
    const token = await MyToken.deploy();
    await token.deployed();

    expect(await token.name()).to.equal("My Token");
    expect(await token.symbol()).to.equal("MYT");
  });

  it("Should have total supply of 1000000 tokens", async function() {
    const token = await MyToken.deploy();
    await token.deployed();

    expect(await token.totalSupply()).to.equal(1000000);
  });

  it("Should transfer tokens between accounts", async function() {
    const token = await MyToken.deploy();
    await token.deployed();

    // Перевести токены от владельца на адрес1
    await token.transfer(addr1.address, 100);

    expect(await token.balanceOf(owner.address)).to.equal(999900);
    expect(await token.balanceOf(addr1.address)).to.equal(100);

    // Перенос токенов с адреса1 на адрес2
    await token.connect(addr1).transfer(addr2.address, 50);

    expect(await token.balanceOf(addr1.address)).to.equal(50);
    expect(await token.balanceOf(addr2.address)).to.equal(50);
  });

  it("Should fail if sender doesn't have enough tokens", async function() {
    const token = await MyToken.deploy();
    await token.deployed();

    const initialOwnerBalance = await token.balanceOf(owner.address);

    // Попробуйте передать больше токенов, чем есть у владельца
    await expect(
      token.transfer(addr1.address, initialOwnerBalance.add(1))
    ).to.be.revertedWith("MyToken: transfer amount exceeds balance");

    // Убедитесь, что баланс владельца не изменился
    expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });
});
