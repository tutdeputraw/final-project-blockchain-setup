const helper = require('./helper');
const { Wallets, Gateway } = require('fabric-network');

const query = async (org, user, contractName, functionName) => {
    try {
        const ccp = helper.getCCP(org);
        const walletPath = helper.getWalletPath(org);
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

        const result = await contract.evaluateTransaction(functionName);

        await gateway.disconnect();

        return helper.responseSuccess(
            `Transaction has been evaluated`,
            helper.convertQueryToJSON(result),
        );
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return `Failed to evaluate transaction: ${error}`;
    }
}

module.exports = {
    query,
}