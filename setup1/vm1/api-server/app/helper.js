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

const getWalletPath = org => {
    const organization = org.toLowerCase();
    const walletPath = path.join(process.cwd(), 'wallet', organization);
    return walletPath;
};

const convertQueryToJSON = result => {
    const resultInString = result.toString();
    const resultInJson = resultInString.match(/\{.*?\}/g).map((str) => JSON.parse(str));
    return resultInJson;
};

const responseError = field => {
    return {
        success: false,
        message: field + ' field is missing or Invalid in the request'
    };
}

const responseSuccess = (message, data) => {
    return {
        success: true,
        message: message || "success",
        data,
    };
}


module.exports = {
    getCCP,
    getCA,
    getWallet,
    getWalletPath,
    convertQueryToJSON,
    getErrorMessage: responseError,
    responseSuccess,
    responseError,
    // getCCP: getCCP,
    // getWalletPath: getWalletPath,
    // getRegisteredUser: getRegisteredUser,
    // isUserRegistered: isUserRegistered,
    // registerAndGerSecret: registerAndGerSecret
}
