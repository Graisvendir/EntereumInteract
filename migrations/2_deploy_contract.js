var Entereum = artifacts.require("./Entereum.sol");

module.exports = function(deployer) {
  deployer.deploy(Entereum, web3.eth.accounts[0]);
};
