
const express = require('express');
const bodyParser = require('body-parser');
const helper = require('./app/helper')
const fs = require('fs');
const path = require('path');


const app = express();
app.use(bodyParser.json());


// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const ccpPath = path.resolve(__dirname, 'config', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

console.log("ccpPath: ", ccpPath);

app.post('/api/enroll-admin', async (req, res) => {
    try {
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const organization = ccp.client.organization;
        const walletPath = path.join(process.cwd(), 'wallet', organization);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        if (identity) {
            console.log('An identity for the admin user "admin" already exists in the wallet');
            res.json({ message: "admin has already enrolled" });
            return;
        }
        console.log("masok kene 1");
        // Enroll the admin user, and import the new identity into the wallet.
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
        res.json({ message: `Successfully enrolled admin user admin and imported it into the wallet` });
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
        res.json({ error: `Failed to enroll admin user "admin": ${error}` });
        process.exit(1);
    }
});

app.post('/api/enroll-user', async (req, res) => {
    try {
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const organization = ccp.client.organization;
        const walletPath = path.join(process.cwd(), 'wallet', organization);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get('appUser');
        if (userIdentity) {
            console.log('An identity for the user "appUser" already exists in the wallet');
            res.json({ message: 'An identity for the user "appUser" already exists in the wallet' });
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            res.json({ message: 'An identity for the admin user "admin" does not exist in the wallet' });
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: 'appUser',
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: 'appUser',
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
        await wallet.put('appUser', x509Identity);
        console.log('Successfully registered and enrolled admin user "appUser" and imported it into the wallet');
        res.json({ message: 'Successfully registered and enrolled admin user "appUser" and imported it into the wallet' });
    } catch (error) {
        console.error(`Failed to register user "appUser": ${error}`);
        res.json({ error: `Failed to register user "appUser": ${error}` });
        process.exit(1);
    }
});

app.post('/api/signin', async (req, res) => {
    // retrieving api key
});

app.get('/api/queryallrealestates', async (req, res) => {
    try {
        // Create a new file system based wallet for managing identities.
        const organization = ccp.client.organization;
        const walletPath = path.join(process.cwd(), 'wallet', organization);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            res.json({ message: 'Run the registerUser.js application before retrying' });
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('real_estate');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('RealEstate_QueryAll');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.json({
            message: `Transaction has been evaluated`,
            data: result.toString()
        });

        // Disconnect from the gateway.
        await gateway.disconnect();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.json({ error: `Failed to evaluate transaction: ${error}` });
        process.exit(1);
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log("app is running on port ", PORT);
});