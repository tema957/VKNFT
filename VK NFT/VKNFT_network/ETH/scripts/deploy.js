const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const contract = require("@truffle/contract");
const MyTokenJSON = require("./build/contracts/MyToken.json");
const MyNFTJSON = require("./build/contracts/MyNFT.json");

// Настройте web3 с локальной сетью разработки
const web3 = new Web3("http://localhost:8545");

// Настраиваем мнемонику и конечную точку для развертывания в тестовой или основной сети
// const mnemonic = "ваша мнемоника";
// const rpcEndpoint = "https://mainnet.infura.io/v3/<ваш-проект-id>";

// Настраиваем провайдера с мнемоникой и конечной точкой
// const provider = new HDWalletProvider(mnemonic, rpcEndpoint);

// Настройте web3 с провайдером для развертывания тестовой или основной сети
// const web3 = новый Web3(поставщик);

// Получаем артефакты контракта
const MyToken = contract(MyTokenJSON);
const MyNFT = contract(MyNFTJSON);

// Настройка поставщиков контрактов
MyToken.setProvider(web3.currentProvider);
MyNFT.setProvider(web3.currentProvider);

(async function() {
  try {
    // Получите учетные записи, которые будут использоваться для развертывания
    const accounts = await web3.eth.getAccounts();

    // Разверните контракт MyToken с начальной поставкой 1000 токенов
    const myToken = await MyToken.new(1000, { from: accounts[0] });

    // Развернуть контракт MyNFT
    const myNFT = await MyNFT.new({ from: accounts[0] });

    // Создайте новый NFT с идентификатором 1 и отправьте его на адрес развертывателя.
    await myNFT.mint(accounts[0], 1, { from: accounts[0] });

    console.log("MyToken contract deployed at:", myToken.address);
    console.log("MyNFT contract deployed at:", myNFT.address);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
})();
