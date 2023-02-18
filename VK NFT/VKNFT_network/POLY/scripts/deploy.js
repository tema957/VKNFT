const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledToken = require("./build/contracts/MyToken.json");
const compiledNFT = require("./build/contracts/MyNFT.json");

const provider = new HDWalletProvider(
  "<YOUR WALLET MNEMONIC HERE>",
  "https://polygon-mainnet.infura.io/v3/<YOUR INFURA PROJECT ID HERE>"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy MyToken contract from account", accounts[0]);

  const token = await new web3.eth.Contract(compiledToken.abi)
    .deploy({
      data: compiledToken.bytecode,
      arguments: ["MyToken", "MTK"],
    })
    .send({
      from: accounts[0],
      gas: "6000000",
    });

  console.log("MyToken contract deployed to", token.options.address);

  console.log("Attempting to deploy MyNFT contract from account", accounts[0]);

  const nft = await new web3.eth.Contract(compiledNFT.abi)
    .deploy({
      data: compiledNFT.bytecode,
      arguments: ["MyNFT", "MNF"],
    })
    .send({
      from: accounts[0],
      gas: "6000000",
    });

  console.log("MyNFT contract deployed to", nft.options.address);
};

deploy();
