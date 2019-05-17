var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Arts = artifacts.require("./Arts.sol")

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Arts)
};
