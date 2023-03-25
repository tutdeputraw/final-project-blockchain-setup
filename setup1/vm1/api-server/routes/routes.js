const express = require('express');
const router = express.Router();


const chaincodeSDKController = require('../controllers/chaincodeSDKController');
router.post('/chaincode-sdk/enroll/admin', chaincodeSDKController.enrollAdminController);
router.post('/chaincode-sdk/enroll/user', chaincodeSDKController.enrollUserController);
router.post('/chaincode-sdk/invoke', chaincodeSDKController.invokeController);
router.get('/chaincode-sdk/query', chaincodeSDKController.queryController);
router.get('/chaincode-sdk/query/pagination', chaincodeSDKController.queryWithPaginationController);


// const queryController = 


const userController = require('../controllers/userController');


const realEstateController = require('../controllers/realEstateController');


const realEstateHistoryController = require('../controllers/realEstateHistoryController');


module.exports = router;