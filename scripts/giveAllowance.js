require('dotenv').config()
const Web3 = require('web3');

// For example, using an HTTP provider
const web3 = new Web3(process.env.TRON_NODE);

const contractMetadata = require('../build/contracts/MockUSDT.json');

const contract = new web3.eth.Contract(contractMetadata.abi, process.env.USDT_CONTRACT);

contract.methods.allowance(process.env.CONTROLLER_ADDRESS, process.env.CONTRACT_ADDRESS).call().then((result) => {
   console.log(result)
})