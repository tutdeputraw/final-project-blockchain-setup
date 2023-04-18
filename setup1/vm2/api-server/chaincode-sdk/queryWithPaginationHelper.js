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

        const input = '[{\"Key\":\"real-estate-2\", \"Record\":{\"acre_lot\":\"150\",\"bath\":\"1\",\"bed\":\"1\",\"city\":\"ndarjo\",\"full_address\":\"manukan\",\"house_size\":\"5\",\"id\":\"2\",\"is_open_to_sell\":\"false\",\"owner_id\":\"1\",\"price\":\"11000\",\"state\":\"indo\",\"street\":\"celep\",\"zip_code\":\"61271\"}},{\"Key\":\"real-estate-4\", \"Record\":{\"acre_lot\":\"150\",\"bath\":\"1\",\"bed\":\"1\",\"city\":\"ndarjo\",\"full_address\":\"manukan\",\"house_size\":\"5\",\"id\":\"4\",\"is_open_to_sell\":\"false\",\"owner_id\":\"2\",\"price\":\"11000\",\"state\":\"indo\",\"street\":\"celep\",\"zip_code\":\"61271\"}}][{\"ResponseMetadata\":{\"RecordsCount\":\"2\", \"Bookmark\":\"g1AAAABKeJzLYWBgYMpgSmHgKy5JLCrJTq2MT8lPzkzJBYrzFqUm5uimAiVKUnVNQIo4YIowpbMAGVsWPw\"}}]';

        const splitIndex = input.lastIndexOf(']') + 1;
        const firstString = input.slice(0, splitIndex);
        const secondString = input.slice(splitIndex);

        let parsedFirst, parsedSecond;

        try {
            parsedFirst = JSON.parse(firstString);
        } catch (error) {
            console.error('Error parsing first string:', error.message);
        }

        try {
            parsedSecond = JSON.parse(secondString);
        } catch (error) {
            console.error('Error parsing second string:', error.message);
        }

        console.log(parsedFirst);
        console.log(parsedSecond);


        // const splitIndex = result.lastIndexOf(']') + 1;
        // const firstString = result.slice(0, splitIndex);
        // const secondString = result.slice(splitIndex);
        // const parsedFirst = JSON.parse(firstString);
        // const parsedSecond = JSON.parse(secondString);

        // console.log("IKILO:", result.toString());
        // console.log('mosokse:', JSON.parse(result.toString()));

        await gateway.disconnect();

        return helper.responseSuccess(
            `Transaction has been evaluated`,
            // JSON.parse(result),
            {
                // result: parsedFirst,
                // meta: parsedSecond,
            }
        );
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return `Failed to evaluate transaction: ${error}`;
    }
}

module.exports = {
    QueryWithPaginationHelper
}