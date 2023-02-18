const MyToken = artifacts.require("MyToken");
const MyNFT = artifacts.require("MyNFT");

module.exports = function(deployer) {
  deployer.deploy(MyToken, 1000);
  deployer.deploy(MyNFT);
};
