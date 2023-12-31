var CrossChain = artifacts.require("./CrossChainTransfer.sol");
var USDT = artifacts.require("./MockUSDT.sol");

module.exports = function (deployer) {
   // First, deploy the USDT contract
   deployer.deploy(USDT).then(() => {
      // After the USDT contract is deployed, get its address

      return USDT.deployed();
   }).then((usdtInstance) => {
      // Now deploy the CrossChainTransfer contract, passing in the address of USDT
      return deployer.deploy(CrossChain, usdtInstance.address);
   })
      .catch((err) => {
         console.log(err);
      });
   // deployer.deploy(CrossChain, "TQL9BhfCudsc1WW6hBieA9txB7mhDttLVs");
};
