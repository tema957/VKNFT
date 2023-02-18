const MyToken = artifacts.require("MyToken");
const MyNFT = artifacts.require("MyNFT");

module.exports = async function(deployer) {
  await deployer.deploy(MyToken, "MyToken", "MTK");
  const myToken = await MyToken.deployed();

  await deployer.deploy(MyNFT, "MyNFT", "MNFT");
  const myNFT = await MyNFT.deployed();

// Вы можете вызывать методы развернутых контрактов следующим образом:
// постоянный баланс = ожидание myToken.balanceOf('0x123456...');
};
