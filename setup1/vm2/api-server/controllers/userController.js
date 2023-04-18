const { QueryHelper } = require('../chaincode-sdk/queryHelper');
const helper = require('../chaincode-sdk/helper');
const { RegisterAdminHelper } = require('../chaincode-sdk/adminHelper');
const { RegisterUserHelper, CheckIfUserExistHelper } = require('../chaincode-sdk/userHelper');
const { QueryWithPaginationHelper } = require('../chaincode-sdk/queryWithPaginationHelper');
const { InvokeHelper } = require('../chaincode-sdk/invokeHelper');


const UserController_Init = async (req, res) => { }


const UserController_CheckIfUserExist = async (req, res) => {
    // const contractName = 'real_estate';
    // const functionName = 'Query';
    // const username = req.body.username;
    // const organizationName = req.body.organizationName;
    // const userMSP = req.query.userMSP;

    // console.debug('User name : ' + username);
    // console.debug('Organization name  : ' + organizationName);

    // if (!username) {
    //     res.json(helper.getErrorMessage('\'username\''));
    //     return;
    // }
    // if (!userMSP) {
    //     res.json(helper.getErrorMessage('\'userMSP\''));
    //     return;
    // }
    // if (!organizationName) {
    //     res.json(helper.getErrorMessage('\'organizationName\''));
    //     return;
    // }

    // const functionArgs = {

    // };
    // const response = await QueryHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    // res.json({ success: true, result: response });
    res.json({ message: 'not yet developed' });
}


const UserController_GetById = async (req, res) => { }


const UserController_GetUserByNameAndEmail = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'Query';

    const userMSP = req.query.userMSP; // username in msp
    const user = req.query.user; //username in user model
    const email = req.query.email; // email in user model
    const organizationName = req.query.organizationName;
    const perPage = req.query.perPage;
    const bookmark = req.query.bookmark;

    console.debug('End point : /api/query');
    console.debug('User name : ' + userMSP);
    console.debug('Email name : ' + email);
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Org name       : ' + organizationName);

    if (!userMSP) {
        res.json(helper.getErrorMessage('\'userMSP\''));
        return;
    }
    if (!user) {
        res.json(helper.getErrorMessage('\'user\''));
        return;
    }
    if (!email) {
        res.json(helper.getErrorMessage('\'email\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const functionArgs = [
        `{\"selector\": {\"userModel_name\": {\"$eq\": \"${user}\"},\"userModel_email\": {\"$eq\": \"${email}\"}}}`,
        `${perPage}`,
        `${bookmark}`,
    ]

    const response = await QueryHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}


const UserController_GetAll = async (req, res) => { }


const UserController_Create = async (req, res) => { }


module.exports = {
    UserController_Init,
    UserController_CheckIfUserExist,
    UserController_GetById,
    UserController_GetAll,
    UserController_Create,
    UserController_GetUserByNameAndEmail,
}