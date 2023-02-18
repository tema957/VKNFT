const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const MyToken = artifacts.require('MyToken.sol');
const MyNFT = artifacts.require('MyNFT.sol');

const provider = new HDWalletProvider(
  '<your mnemonic phrase>',
  'https://data-seed-prebsc-1-s1.binance.org:8545'
);

const web3 = new Web3(provider);

const deployContracts = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Deploying MyToken from account: ${accounts[0]}`);
  const myToken = await MyToken.new({ from: accounts[0] });

  console.log(`Deploying MyNFT from account: ${accounts[0]}`);
  const myNFT = await MyNFT.new(myToken.address, { from: accounts[0] });

  console.log('MyToken contract address:', myToken.address);
  console.log('MyNFT contract address:', myNFT.address);
};

deployContracts();
