const helper = require('../chaincode-sdk/helper');
const { QueryHelper } = require('../chaincode-sdk/queryHelper');
const { RegisterAdminHelper } = require('../chaincode-sdk/adminHelper');
const { RegisterUserHelper } = require('../chaincode-sdk/userHelper');
const { QueryWithPaginationHelper } = require('../chaincode-sdk/queryWithPaginationHelper');
const { InvokeHelper } = require('../chaincode-sdk/invokeHelper');

const RealEstateController_Init = async (req, res) => { }


const RealEstateController_Create = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstate_Create';

    const {
        userMSP, organizationName, realEstateId, realEstateAcreLot,
        realEstateBath, realEstateBed, realEstateCity, realEstateFullAddress,
        realEstateHouseSize, realEstateIsOpenToSell, realEstateOwnerId,
        realEstatePrice, realEstateState, realEstateStreet, realEstateZipCode
    } = req.body;

    if (!userMSP) {
        res.json(helper.getErrorMessage('\'userMSP\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }
    if (!realEstateId) {
        res.json(helper.getErrorMessage('\'realEstateId\''));
        return;
    }
    if (!realEstateAcreLot) {
        res.json(helper.getErrorMessage('\'realEstateAcreLot\''));
        return;
    }
    if (!realEstateBath) {
        res.json(helper.getErrorMessage('\'realEstateBath\''));
        return;
    }
    if (!realEstateBed) {
        res.json(helper.getErrorMessage('\'realEstateBed\''));
        return;
    }
    if (!realEstateCity) {
        res.json(helper.getErrorMessage('\'realEstateCity\''));
        return;
    }
    if (!realEstateFullAddress) {
        res.json(helper.getErrorMessage('\'realEstateFullAddress\''));
        return;
    }
    if (!realEstateHouseSize) {
        res.json(helper.getErrorMessage('\'realEstateHouseSize\''));
        return;
    }
    if (!realEstateIsOpenToSell) {
        res.json(helper.getErrorMessage('\'realEstateIsOpenToSell\''));
        return;
    }
    if (!realEstateOwnerId) {
        res.json(helper.getErrorMessage('\'realEstateOwnerId\''));
        return;
    }
    if (!realEstatePrice) {
        res.json(helper.getErrorMessage('\'realEstatePrice\''));
        return;
    }
    if (!realEstateStreet) {
        res.json(helper.getErrorMessage('\'realEstateStreet\''));
        return;
    }
    if (!realEstateState) {
        res.json(helper.getErrorMessage('\'realEstateState\''));
        return;
    }
    if (!realEstateZipCode) {
        res.json(helper.getErrorMessage('\'realEstateZipCode\''));
        return;
    }

    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Organization name  : ' + organizationName);

    const functionArgs = [
        realEstateId, realEstateOwnerId, realEstatePrice, realEstateBed,
        realEstateBath, realEstateAcreLot, realEstateFullAddress, realEstateStreet,
        realEstateCity, realEstateState, realEstateZipCode, realEstateHouseSize, realEstateIsOpenToSell
    ];

    const response = await InvokeHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}


const RealEstateController_GetById = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstate_GetById';

    const userMSP = req.query.userMSP;
    const organizationName = req.query.organizationName;
    const realEstateId = req.query.realEstateId;

    console.debug('End point : /api/query');
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Organization name  : ' + organizationName);

    if (!userMSP) {
        res.json(helper.getErrorMessage('\'userMSP\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }
    if (!realEstateId) {
        res.json(helper.getErrorMessage('\'realEstateId\''));
        return;
    }

    const functionArgs = [realEstateId];

    const response = await QueryHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}

const RealEstateController_GetAllWithPagination = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstate_GetAllWithPagination';

    const userMSP = req.query.userMSP;
    const organizationName = req.query.organizationName;
    const perPage = req.query.perPage;
    const bookmark = req.query.bookmark || "";

    console.debug('End point : /api/query');
    console.debug('userMSP : ' + userMSP);
    console.debug('Organization name  : ' + organizationName);
    console.debug('perPage            : ' + perPage);
    console.debug('bookmark           : ' + bookmark);

    if (!userMSP) {
        res.json(helper.getErrorMessage('\'userMSP\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }
    if (!perPage) {
        res.json(helper.getErrorMessage('\'perPage\''));
        return;
    }
    // if (!bookmark) {
    //     res.json(helper.getErrorMessage('\'bookmark\''));
    //     return;
    // }

    const functionArgs = [
        `${perPage}`,
        `${bookmark}`
    ];

    const response = await QueryWithPaginationHelper(organizationName, userMSP, contractName, functionName, functionArgs);
    console.log('jjj:', response);
    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}

const RealEstateController_GetAll = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstate_GetAll';

    const userMSP = req.query.userMSP;
    const organizationName = req.query.organizationName;

    if (!userMSP) {
        res.json(helper.getErrorMessage('\'userMSP\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }

    const functionArgs = [];
    const response = await QueryHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}


const RealEstateController_GetByOwner = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstate_GetByOwner';

    const userMSP = req.query.userMSP;
    const organizationName = req.query.organizationName;
    const ownerId = req.query.ownerId;

    console.debug('End point : /api/query');
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Organization name  : ' + organizationName);

    if (!userMSP) {
        res.json(helper.getErrorMessage('\'userMSP\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }
    if (!ownerId) {
        res.json(helper.getErrorMessage('\'ownerId\''));
        return;
    }

    const functionArgs = [ownerId];

    const response = await QueryHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}


const RealEstateController_CheckIfRealEstateHasAlreadyRegistered = async (req, res) => {
}


const RealEstateController_RegisterNewRealEstate = async (req, res) => { }


const RealEstateController_ChangeRealEstateOwner = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstate_ChangeRealEstateOwner';

    const userMSP = req.body.userMSP;
    const organizationName = req.body.organizationName;
    const realEstateId = req.body.realEstateId;
    const newOwnerId = req.body.newOwnerId;

    console.debug('End point : /RealEstateController_ChangeRealEstateOwner');
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Organization name  : ' + organizationName);

    if (!userMSP) {
        res.json(helper.getErrorMessage('\'userMSP\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }
    if (!realEstateId) {
        res.json(helper.getErrorMessage('\'realEstateId\''));
        return;
    }
    if (!newOwnerId) {
        res.json(helper.getErrorMessage('\'newOwnerId\''));
        return;
    }

    const functionArgs = [realEstateId, newOwnerId];

    const response = await InvokeHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}


const RealEstateController_ChangeRealEstateSellStatus = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstate_ChangeRealEstateSellStatus';

    const userMSP = req.body.userMSP;
    const organizationName = req.body.organizationName;
    const realEstateId = req.body.realEstateId;
    const status = req.body.status;

    console.debug('End point : /RealEstate_ChangeRealEstateSellStatus');
    console.debug('Contract name  : ' + contractName);
    console.debug('Function name  : ' + functionName);
    console.debug('Organization name  : ' + organizationName);

    if (!userMSP) {
        res.json(helper.getErrorMessage('\'userMSP\''));
        return;
    }
    if (!organizationName) {
        res.json(helper.getErrorMessage('\'organizationName\''));
        return;
    }
    if (!realEstateId) {
        res.json(helper.getErrorMessage('\'realEstateId\''));
        return;
    }
    if (!status) {
        res.json(helper.getErrorMessage('\'status\''));
        return;
    }

    const functionArgs = [realEstateId, status];

    const response = await InvokeHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}


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
    RealEstateController_GetAllWithPagination,
    RealEstateController_GetByOwner,
    RealEstateController_CheckIfRealEstateHasAlreadyRegistered,
    RealEstateController_RegisterNewRealEstate,
    RealEstateController_ChangeRealEstateOwner,
    RealEstateController_ChangeRealEstateSellStatus,
    RealEstateController_Search,
}