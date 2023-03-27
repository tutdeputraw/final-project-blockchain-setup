const helper = require('./helper');
const { Wallets } = require('fabric-network');

const RegisterUserHelper = async (user, org) => {
    try {
        const ccp = helper.GetCCPHelper(org);
        const ca = helper.GetCAHelper(ccp, org);
        const walletPath = helper.GetWalletPathHelper(org);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const userIdentity = await wallet.get(user);
        if (userIdentity) {
            console.log(`An identity for the user "${user}" already exists in the wallet`);
            return `An identity for the user "${user}" already exists in the wallet`;
        }

        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            return 'An identity for the admin user "admin" does not exist in the wallet';
        }

        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: user,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: user,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(user, x509Identity);

        console.log(`Successfully registered and enrolled admin user "${user}" and imported it into the wallet`)
        return helper.responseSuccess(
            `Successfully registered and enrolled admin user "${user}" and imported it into the wallet`,
        );
    } catch (error) {
        console.log(`Failed to register user "${user}": ${error}`);
        return `Failed to register user "${user}": ${error}`;
    }
};

const CheckIfUserExistHelper = async (user, org) => {
    try {
        const walletPath = helper.GetWalletPathHelper(org);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const userIdentity = await wallet.get(user);

        console.log("Test11", userIdentity);
        if (userIdentity) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`Failed to check "${user}": ${error}`);
        return false;
    }
}

module.exports = {
    RegisterUserHelper,
    CheckIfUserExistHelper,
}