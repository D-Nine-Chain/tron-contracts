
const CrossTransfer = artifacts.require("CrossChainTransfer");
const USDT = artifacts.require("MockUSDT");


function convertD9AdressToHex(address) {
   const decoded = decodeAddress(address);
   const hex = u8aToHex(decoded);
   return hex;
}
contract("CrossChainTransfer", (accounts) => {
   function grantAllowance(from, to) {

   }
   it("should put 10000 MetaCoin in the first account", async () => {
      usdtContract = await USDT.deployed();
      const balance = await usdtContract.balanceOf(accounts[0]);
      console.log("balance: ", balance.toString());


   });

   it("create commit", async () => {
      usdt = await USDT.deployed();
      cross = await CrossTransfer.deployed();
      const transferAmount = 10000;
      const userBalance = await usdt.balanceOf(accounts[0]);
      const difference = userBalance - transferAmount;
      await usdt.approve(CrossTransfer.address, 100000)
      const transactionId = "0x74657374"
      const fromAddress = accounts[0];
      const fromAddressBytes = "0xBFE0F1faf22abA6Ee0C3F03D5887b43Ca38561B7"
      const toAddress = "0x1cbd2d43530a44705ad088af313e18f80b53ef16b36177cd4b77b846f2a5f07c"
      const usdtbalance = await usdt.balanceOf(accounts[0]);
      console.log("usdtbalance: ", usdtbalance.toString());
      console.log("owner : ", accounts[0]);
      let commitResult = await cross.assetCommit(transactionId, fromAddress, fromAddressBytes, toAddress, transferAmount)
      console.log("address: ", commitResult);
      const newBalance = await usdt.balanceOf(accounts[0]);
      const contractBalance = await usdt.balanceOf(CrossTransfer.address);
      assert.equal(newBalance, difference, "Balance should be `transferAmount` less than before");
      assert.equal(contractBalance, transferAmount, "Contract balance should be `transferAmount`");
   });

   it("creates transfer", async () => {
      usdt = await USDT.deployed();
      cross = await CrossTransfer.deployed();
      await usdt.transfer(CrossTransfer.address, 10000000)
      const transferAmount = 10000;
      const transactionId = "0x746573741"
      const toAddress = accounts[1];
      const fromAddressBytes = '0x5ed3691b53a03436f73ef036fa620ff04e2fa28f89eac1a71e27f38fc07e8028';
      const toAddressBytes = "0xBFE0F1faf22abA6Ee0C3F03D5887b43Ca38561B7"

      await cross.assetDispatch(transactionId, toAddress, fromAddressBytes, toAddressBytes, transferAmount)
      const newUserBalance = await usdt.balanceOf(toAddress);
      assert.equal(newUserBalance, transferAmount, "New user balance should be `transferAmount`");

   })

});
