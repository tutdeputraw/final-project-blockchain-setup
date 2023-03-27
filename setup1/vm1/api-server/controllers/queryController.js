const { QueryHelper } = require('../chaincode-sdk/queryHelper');
const helper = require('../chaincode-sdk/helper');
const { RegisterAdminHelper } = require('../chaincode-sdk/adminHelper');
const { RegisterUserHelper } = require('../chaincode-sdk/userHelper');
const { QueryWithPaginationHelper } = require('../chaincode-sdk/queryWithPaginationHelper');
const { InvokeHelper } = require('../chaincode-sdk/invokeHelper');


const QueryController_Query = async (req, res) => { };


const QueryController_QueryWithPagination = async (req, res) => { };


const QueryController_Search = async (req, res) => {
    const contractName = 'real_estate';
    const functionName = 'QueryWithPagination';

    const username = req.body.username;
    const organizationName = req.body.organizationName;
    const fieldSearch = req.body.fieldSearch;
    const keywordSearch = req.body.keywordSearch;
    const perPage = req.body.perPage;
    const bookmark = req.body.bookmark;

    console.debug('End point : /api/query');
    console.debug('User name : ' + username);
    console.debug('Organization name  : ' + organizationName);
    console.debug('fieldearch          : ' + fieldSearch);
    console.debug('keywordSearch      : ' + keywordSearch);
    console.debug('perPage            : ' + perPage);
    console.debug('bookmark           : ' + bookmark);

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
    if (!fieldSearch) {
        res.json(helper.getErrorMessage('\'fieldearch\''));
        return;
    }
    if (!keywordSearch) {
        res.json(helper.getErrorMessage('\'keywordSearch\''));
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
        // "{\"selector\":{\"street\":\"celep\"}}",
        // "3",
        // ""
        `{\"selector\":{\"${fieldSearch}\":\"${keywordSearch}\"}}`,
        `${perPage}`,
        `${bookmark}`
    ];

    const response = await QueryWithPaginationHelper(organizationName, username, contractName, functionName, functionArgs);
    console.log('jjj:', response);
    if (response && typeof response !== 'string') {
        res.json(response);
    } else {
        res.json(helper.responseError(response));
    }
};


module.exports = {
    QueryController_Query,
    QueryController_QueryWithPagination,
    QueryController_Search,
}