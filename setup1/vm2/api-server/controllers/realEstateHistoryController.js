const { QueryHelper } = require('../chaincode-sdk/queryHelper');
const helper = require('../chaincode-sdk/helper');
const { RegisterAdminHelper } = require('../chaincode-sdk/adminHelper');
const { RegisterUserHelper } = require('../chaincode-sdk/userHelper');
const { QueryWithPaginationHelper } = require('../chaincode-sdk/queryWithPaginationHelper');
const { InvokeHelper } = require('../chaincode-sdk/invokeHelper');


const RealEstateHistoryController_Create = async (req, res) => { }


const RealEstateHistoryController_GetByRealEstateId = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstateHistory_GetByRealEstateId';
    const userMSP = req.query.userMSP; // username in msp
    const organizationName = req.query.organizationName;
    const realEstateId = req.query.realEstateId;

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

    const functionArgs = [realEstateId]
    const response = await QueryHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}


module.exports = {
    RealEstateHistoryController_Create,
    RealEstateHistoryController_GetByRealEstateId,
}