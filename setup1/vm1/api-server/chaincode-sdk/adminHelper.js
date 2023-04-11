const helper = require('./helper');
const { Wallets } = require('fabric-network');

const RegisterAdminHelper = async org => {
    try {
        const ccp = helper.GetCCPHelper(org);
        const ca = helper.GetCAHelper(ccp, org);
        const walletPath = helper.GetWalletPathHelper(org);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('admin');
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            return 'An identity for the admin user "admin" already exists in the wallet';
        }

        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('admin', x509Identity);

        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
        return helper.responseSuccess(
            `Successfully enrolled admin user admin and imported it into the wallet`
        );
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        return `Failed to enroll admin user "admin": ${error}`;
    }
}

module.exports = {
    RegisterAdminHelper,
}