const Web3 = require('web3');
const web3 = new Web3('https://sepolia.infura.io/v3/a1313730053c48a58974e3f68568c174');

const testToken = require('../../ABI/TestToken.js'); 

const tokenContract = new web3.eth.Contract(testToken.abi, testToken.address);
exports. getBalance = async (req, res) => {
    try {
       
        const userAddress = req.body.address;
        //console.log(userAddress);
        if (!userAddress) {
            return res.status(400).json({ error: 'Address is required.' });
        }

        // Call the getTokenBalance function of the ERC20 token contract
        const balance = await tokenContract.methods.getTokenBalance(userAddress).call();

        // Convert balance from smallest unit to token units
        const balanceInTokenUnits = web3.utils.fromWei(balance, 'ether');
        
        res.json({ balanceInTokenUnits });
    } catch (error) {
        console.error('Error fetching token balance:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user balance.' });
    }
};

