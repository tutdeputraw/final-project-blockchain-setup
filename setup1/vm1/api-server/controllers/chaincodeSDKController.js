const { QueryHelper } = require('../chaincode-sdk/queryHelper');
const helper = require('../chaincode-sdk/helper');
const { RegisterAdminHelper } = require('../chaincode-sdk/registerAdminHelper');
const { RegisterUserHelper } = require('../chaincode-sdk/registerUserHelper');
const { QueryWithPaginationHelper } = require('../chaincode-sdk/queryWithPaginationHelper');
const { InvokeHelper } = require('../chaincode-sdk/invokeHelper');


const ChaincodeSDKController_EnrollAdmin = async (req, res) => {
    const organizationName = req.body.organizationName;

    console.debug('End point : /api/enroll-admin');
    console.debug('Org name  : ' + organizationName);

    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await RegisterAdminHelper(organizationName);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json({ success: false, message: response });
    }
};


const ChaincodeSDKController_EnrollUser = async (req, res) => {
    const username = req.body.username;
    const organizationName = req.body.organizationName;

    console.debug('End point : /api/enroll-user');
    console.debug('User name : ' + username);
    console.debug('Org name  : ' + organizationName);

    if (!username) {
        res.json(helper.getErrorMessage('\'username\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await RegisterUserHelper(username, organizationName);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json({ success: false, message: response });
    }
};


const ChaincodeSDKController_Invoke = async (req, res) => {
    const organizationName = req.body.organizationName;
    const username = req.body.username;
    const contractName = req.body.contractName;
    const functionName = req.body.functionName;
    const functionArgs = req.body.functionArgs;

    console.debug('End point : /api/invoke');
    console.debug('User name : ' + username);
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + contractName);
    console.debug('Function args  : ' + functionArgs);
    console.debug('Organization name  : ' + organizationName);

    if (!username) {
        res.json(helper.getErrorMessage('\'username\''));
        return;
    }
    if (!contractName) {
        res.json(helper.getErrorMessage('\'contractName\''));
        return;
    }
    if (!functionName) {
        res.json(helper.getErrorMessage('\'functionName\''));
        return;
    }
    if (!functionArgs) {
        res.json(helper.getErrorMessage('\'functionArgs\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await InvokeHelper(organizationName, username, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json({ success: false, message: response });
    }
};


const ChaincodeSDKController_Query = async (req, res) => {
    const username = req.body.username;
    const contractName = req.body.contractName;
    const functionName = req.body.functionName;
    const organizationName = req.body.organizationName;
    const functionArgs = req.body.functionArgs;

    console.debug('End point : /api/query');
    console.debug('User name : ' + username);
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Function args  : ' + functionArgs);
    console.debug('Organization name  : ' + organizationName);

    if (!username) {
        res.json(helper.getErrorMessage('\'username\''));
        return;
    }
    if (!contractName) {
        res.json(helper.getErrorMessage('\'contractName\''));
        return;
    }
    if (!functionName) {
        res.json(helper.getErrorMessage('\'functionName\''));
        return;
    }
    if (!functionArgs) {
        res.json(helper.getErrorMessage('\'functionArgs\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await QueryHelper(organizationName, username, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
};


const ChaincodeSDKController_QueryWithPagination = async (req, res) => {
    const username = req.body.username;
    const contractName = req.body.contractName;
    const functionName = req.body.functionName;
    const organizationName = req.body.organizationName;
    const functionArgs = req.body.functionArgs;

    console.debug('End point : /api/query');
    console.debug('User name : ' + username);
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Function args  : ' + functionArgs);
    console.debug('Organization name  : ' + organizationName);

    if (!username) {
        res.json(helper.getErrorMessage('\'username\''));
        return;
    }
    if (!contractName) {
        res.json(helper.getErrorMessage('\'contractName\''));
        return;
    }
    if (!functionName) {
        res.json(helper.getErrorMessage('\'functionName\''));
        return;
    }
    if (!functionArgs) {
        res.json(helper.getErrorMessage('\'functionArgs\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const response = await QueryWithPaginationHelper(organizationName, username, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
};


module.exports = {
    ChaincodeSDKController_EnrollAdmin,
    ChaincodeSDKController_EnrollUser,
    ChaincodeSDKController_Invoke,
    ChaincodeSDKController_Query,
    ChaincodeSDKController_QueryWithPagination,
}