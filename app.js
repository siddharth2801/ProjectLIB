const express = require('express');
const Web3 = require('web3');
const ethers = require('ethers');

const app = express();
const port = 3000; // Change this to your desired port

// Ethereum network and provider configuration
const web3 = new Web3('http://127.0.0.1:8545/'); // Replace with your Ethereum provider URL
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/'); // Replace with your Ethereum provider URL

// ABI and contract address for your Lock contract
const lockContractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Replace with your contract's address
const lockContractABI = [
  // Define your contract's ABI here
  // Example: { "constant": true, "inputs": [], "name": "unlockTime", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function" },
  // Add more ABI entries for other contract functions as needed
];

const lockContract = new web3.eth.Contract(lockContractABI, lockContractAddress);

// Define API endpoints
app.get('/unlock-time', async (req, res) => {
  try {
    const unlockTime = await lockContract.methods.unlockTime().call();
    res.json({ unlockTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/withdraw', async (req, res) => {
  try {
    const owner = await lockContract.methods.owner().call();
    if (owner.toLowerCase() !== '0x' + req.body.ownerAddress.toLowerCase()) {
      return res.status(403).json({ error: 'You are not the owner' });
    }

    await lockContract.methods.withdraw().send({ from: req.body.ownerAddress });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
