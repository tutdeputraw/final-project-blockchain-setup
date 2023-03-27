const helper = require('../chaincode-sdk/helper');
const { QueryHelper } = require('../chaincode-sdk/queryHelper');
const { RegisterAdminHelper } = require('../chaincode-sdk/adminHelper');
const { RegisterUserHelper } = require('../chaincode-sdk/userHelper');
const { QueryWithPaginationHelper } = require('../chaincode-sdk/queryWithPaginationHelper');
const { InvokeHelper } = require('../chaincode-sdk/invokeHelper');


const RealEstateController_Init = async (req, res) => { }


const RealEstateController_Create = async (req, res) => { }


const RealEstateController_GetById = async (req, res) => { }


const RealEstateController_GetAll = async (req, res) => { }


const RealEstateController_GetByOwner = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstate_GetByOwner';

    const userMSP = req.query.userMSP;
    const organizationName = req.query.organizationName;
    const ownerId = req.query.ownerId;

    console.debug('End point : /api/query');
    console.debug('User name : ' + username);
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
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
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const functionArgs = [ownerId];

    const response = await QueryHelper(organizationName, username, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}


const RealEstateController_CheckIfRealEstateHasAlreadyRegistered = async (req, res) => { }


const RealEstateController_RegisterNewRealEstate = async (req, res) => { }


const RealEstateController_ChangeRealEstateOwner = async (req, res) => { }


const RealEstateController_ChangeRealEstateSellStatus = async (req, res) => { }


const RealEstateController_Search = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'Query';

    const userMSP = req.query.userMSP;
    const organizationName = req.query.organizationName;
    const fieldSearch = req.query.fieldSearch;
    const keywordSearch = req.query.keywordSearch;
    const perPage = req.query.perPage;
    const bookmark = req.query.bookmark;

    console.debug('End point : /api/query');
    console.debug('User MSP : ' + userMSP);
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Org name       : ' + organizationName);
    console.debug('Field Search   : ' + fieldSearch);
    console.debug('Keyword Search : ' + keywordSearch);

    if (!userMSP) {
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
    if (!fieldSearch) {
        res.json(helper.getErrorMessage('\'fieldSearch\''));
        return;
    }
    if (!keywordSearch) {
        res.json(helper.getErrorMessage('\'keywordSearch\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const functionArgs = [
        `{\"selector\":{\"${fieldSearch}\":\"${keywordSearch}\"}}`,
        `${perPage}`,
        `${bookmark}`,
    ]

    const response = await QueryHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
};


module.exports = {
    RealEstateController_Init,
    RealEstateController_Create,
    RealEstateController_GetById,
    RealEstateController_GetAll,
    RealEstateController_GetByOwner,
    RealEstateController_CheckIfRealEstateHasAlreadyRegistered,
    RealEstateController_RegisterNewRealEstate,
    RealEstateController_ChangeRealEstateOwner,
    RealEstateController_ChangeRealEstateSellStatus,
    RealEstateController_Search,
}