// 'use strict';

var { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const util = require('util');

const GetCCPHelper = org => {
    const organization = org.toLowerCase();
    console.log("OII ", organization);
    const ccpPath = path.resolve(__dirname, '..', 'config', `connection-${organization}.json`);
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    return ccp;
};

const GetCAHelper = (ccp, org) => {
    const organization = org.toLowerCase();
    const caInfo = ccp.certificateAuthorities[`ca.${organization}.example.com`];
    const caTLSCACerts = caInfo.tlsCACerts.pem;
    const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
    return ca;
};

const GetWalletHelper = async org => {
    const organization = org.toLowerCase();
    const walletPath = path.join(process.cwd(), '..', 'wallet', organization);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    return wallet;
};

const GetWalletPathHelper = org => {
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
    GetCCPHelper,
    GetCAHelper,
    GetWalletHelper,
    GetWalletPathHelper,
    convertQueryToJSON,
    getErrorMessage: responseError,
    responseSuccess,
    responseError,
}
