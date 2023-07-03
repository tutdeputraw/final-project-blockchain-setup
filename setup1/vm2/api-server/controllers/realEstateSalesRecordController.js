const { QueryHelper } = require('../chaincode-sdk/queryHelper');
const helper = require('../chaincode-sdk/helper');
const { RegisterAdminHelper } = require('../chaincode-sdk/adminHelper');
const { RegisterUserHelper } = require('../chaincode-sdk/userHelper');
const { QueryWithPaginationHelper } = require('../chaincode-sdk/queryWithPaginationHelper');
const { InvokeHelper } = require('../chaincode-sdk/invokeHelper');


const RealEstateSalesRecordController_UpdateSalesPhase = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstateSalesRecord_UpdateSalesPhase';

    const userMSP = req.body.userMSP;
    const organizationName = req.body.organizationName;
    const realEstateId = req.body.realEstateId;
    const sellerId = req.body.sellerId;
    const salesPhase = req.body.salesPhase;

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
    if (!sellerId) {
        res.json(helper.getErrorMessage('\'sellerId\''));
        return;
    }
    if (!salesPhase) {
        res.json(helper.getErrorMessage('\'salesPhase\''));
        return;
    }

    const functionArgs = [realEstateId, sellerId, salesPhase]

    const response = await InvokeHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}

const RealEstateSalesRecordController_UpdatePropertyAgentId = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstateSalesRecord_UpdatePropertyAgentId';

    const userMSP = req.body.userMSP;
    const organizationName = req.body.organizationName;
    const realEstateId = req.body.realEstateId;
    const sellerId = req.body.sellerId;
    const propertyAgentId = req.body.propertyAgentId;

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
    if (!sellerId) {
        res.json(helper.getErrorMessage('\'sellerId\''));
        return;
    }
    if (!propertyAgentId) {
        res.json(helper.getErrorMessage('\'propertyAgentId\''));
        return;
    }

    const functionArgs = [realEstateId, sellerId, propertyAgentId]

    const response = await InvokeHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}

const RealEstateSalesRecordController_UpdateUsersInterest = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstateSalesRecord_IncrementInterestUsers';

    const userMSP = req.body.userMSP;
    const organizationName = req.body.organizationName;
    const realEstateId = req.body.realEstateId;
    const sellerId = req.body.sellerId;
    const propertyAgentId = req.body.propertyAgentId;

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
    if (!sellerId) {
        res.json(helper.getErrorMessage('\'sellerId\''));
        return;
    }
    if (!propertyAgentId) {
        res.json(helper.getErrorMessage('\'propertyAgentId\''));
        return;
    }

    const functionArgs = [realEstateId, sellerId, propertyAgentId]

    const response = await InvokeHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}

const RealEstateSalesRecordController_UpdatePropertyAdvisorId = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstateSalesRecord_UpdatePropertyAdvisorId';

    const userMSP = req.body.userMSP;
    const organizationName = req.body.organizationName;
    const realEstateId = req.body.realEstateId;
    const sellerId = req.body.sellerId;
    const propertyAdvisorId = req.body.propertyAdvisorId;

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
    if (!sellerId) {
        res.json(helper.getErrorMessage('\'sellerId\''));
        return;
    }
    if (!propertyAdvisorId) {
        res.json(helper.getErrorMessage('\'propertyAdvisorId\''));
        return;
    }

    const functionArgs = [realEstateId, sellerId, propertyAdvisorId]

    const response = await InvokeHelper(organizationName, userMSP, contractName, functionName, functionArgs);

    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
}

const RealEstateSalesRecordController_GetByRealEstateId = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'RealEstateSalesRecord_GetByRealEstateIdComposite';

    const userMSP = req.query.userMSP;
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
    RealEstateSalesRecordController_GetByRealEstateId,
    RealEstateSalesRecordController_UpdateSalesPhase,
    RealEstateSalesRecordController_UpdatePropertyAdvisorId,
    RealEstateSalesRecordController_UpdatePropertyAgentId,
}