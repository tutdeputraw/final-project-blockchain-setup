// 'use strict';

var { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const util = require('util');

const getCCP = org => {
    const organization = org.toLowerCase();
    console.log("OII ", organization);
    const ccpPath = path.resolve(__dirname, '..', 'config', `connection-${organization}.json`);
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    return ccp;
};

const getCA = (ccp, org) => {
    const organization = org.toLowerCase();
    const caInfo = ccp.certificateAuthorities[`ca.${organization}.example.com`];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
    return ca;
};

const getWallet = async org => {
    const organization = org.toLowerCase();
    const walletPath = path.join(process.cwd(), '..', 'wallet', organization);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    return wallet;
};


module.exports = {
    getCCP,
    getCA,
    getWallet,
    // getCCP: getCCP,
    // getWalletPath: getWalletPath,
    // getRegisteredUser: getRegisteredUser,
    // isUserRegistered: isUserRegistered,
    // registerAndGerSecret: registerAndGerSecret
}
