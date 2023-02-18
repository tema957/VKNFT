const MyToken = artifacts.require("MyToken");
const MyNFT = artifacts.require("MyNFT");

module.exports = async function(deployer) {
  // Разверните контракт MyToken с начальной поставкой 1000 токенов
  await deployer.deploy(MyToken, 1000);

  // Развернуть контракт MyNFT
  await deployer.deploy(MyNFT);

  // Создайте новый NFT с идентификатором 1 и отправьте его на адрес развертывателя.
  const myNFT = await MyNFT.deployed();
  await myNFT.mint(deployer.address, 1);
};
