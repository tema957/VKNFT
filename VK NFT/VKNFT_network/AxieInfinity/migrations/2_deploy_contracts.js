const Axie = artifacts.require("Axie");
const Ownable = artifacts.require("Ownable");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Axie);
  deployer.deploy(Axie);
};
