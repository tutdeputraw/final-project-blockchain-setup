const helper = require('./helper');
const { Wallets, Gateway } = require('fabric-network');

const QueryWithPaginationHelper = async (org, user, contractName, functionName, functionArgs) => {
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

        const result = await contract.evaluateTransaction(functionName, ...functionArgs);
        const parsedResult = JSON.parse(result);

        await gateway.disconnect();

        return {
            success: true,
            message: 'Transaction has been evaluated',
            data: parsedResult.data,
            metadata: parsedResult.ResponseMetadata
        }
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return `Failed to evaluate transaction: ${error}`;
    }
}

module.exports = {
    QueryWithPaginationHelper
}