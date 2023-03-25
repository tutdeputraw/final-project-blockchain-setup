const { Gateway, Wallets } = require('fabric-network');
const helper = require('./helper');

const InvokeHelper = async (org, user, contractName, functionName, args) => {
    try {
        const ccp = helper.GetCCPHelper(org);
        const walletPath = helper.GetWalletPathHelper(org);
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get(user);
        if (!identity) {
            console.log(`An identity for the user "${user}" does not exist in the wallet`);
            return `An identity for the user "${user}" does not exist in the wallet`;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: false } });

        const network = await gateway.getNetwork('mychannel');

        const contract = network.getContract(contractName);

        await contract.submitTransaction(functionName, ...args);

        await gateway.disconnect();

        console.log('Transaction has been submitted');
        return helper.responseSuccess('Transaction has been submitted');
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return `Failed to submit transaction: ${error}`;
    }
}

module.exports = {
    InvokeHelper,
}