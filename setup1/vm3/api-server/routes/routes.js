const express = require('express');
const router = express.Router();


const chaincodeSDKController = require('../controllers/chaincodeSDKController');
router.post('/chaincode-sdk/enroll/admin', chaincodeSDKController.ChaincodeSDKController_EnrollAdmin);
router.post('/chaincode-sdk/enroll/user', chaincodeSDKController.ChaincodeSDKController_EnrollUser);
router.post('/chaincode-sdk/invoke', chaincodeSDKController.ChaincodeSDKController_Invoke);
router.get('/chaincode-sdk/query', chaincodeSDKController.ChaincodeSDKController_Query);
router.get('/chaincode-sdk/query/pagination', chaincodeSDKController.ChaincodeSDKController_QueryWithPagination);


const userController = require('../controllers/userController');
router.post('/user/init', userController.UserController_Init);
router.get('/user/checkIfUserExist', userController.UserController_CheckIfUserExist);
router.get('/user/getById', userController.UserController_GetById);
router.get('/user/getAll', userController.UserController_GetAll);
router.get('/user/getByEmailAndName', userController.UserController_GetUserByNameAndEmail);
router.get('/user/create', userController.UserController_Create);


const realEstateController = require('../controllers/realEstateController');
router.post('/realEstate/init', realEstateController.RealEstateController_Init);
router.post('/realEstate/create', realEstateController.RealEstateController_Create);
router.get('/realEstate/getByOpenToSell/detail', realEstateController.RealEstateController_GetByOpenToSellDetail);
router.get('/realEstate/getByOpenToSell', realEstateController.RealEstateController_GetByOpenToSell);
router.get('/realEstate/getById', realEstateController.RealEstateController_GetById);
router.get('/realEstate/getAll', realEstateController.RealEstateController_GetAll);
router.get('/realEstate/getByOwner', realEstateController.RealEstateController_GetByOwner);
router.get('/realEstate/CheckIfRealEstateHasAlreadyRegistered', realEstateController.RealEstateController_CheckIfRealEstateHasAlreadyRegistered);
router.post('/realEstate/RegisterNewRealEstate', realEstateController.RealEstateController_RegisterNewRealEstate);
router.post('/realEstate/ChangeRealEstateOwner', realEstateController.RealEstateController_ChangeRealEstateOwner);
router.post('/realEstate/ChangeRealEstateSellStatus', realEstateController.RealEstateController_ChangeRealEstateSellStatus);
router.get('/realEstate/searchByLocation', realEstateController.RealEstateController_Search);


const realEstateHistoryController = require('../controllers/realEstateHistoryController');
router.post('/realEstate/history/create', realEstateHistoryController.RealEstateHistoryController_Create);
router.get('/realEstate/history/getByRealEstateId', realEstateHistoryController.RealEstateHistoryController_GetByRealEstateId);


const realEstateSalesRecordController = require('../controllers/realEstateSalesRecordController');
router.get('/realEstate/salesRecord/getByRealEstateId', realEstateSalesRecordController.RealEstateSalesRecordController_GetByRealEstateId);
router.post('/realEstate/salesRecord/updateSalesPhase', realEstateSalesRecordController.RealEstateSalesRecordController_UpdateSalesPhase);
router.post('/realEstate/salesRecord/updateRealEstateAssessment', realEstateSalesRecordController.RealEstateSalesRecordController_UpdateRealEstateAssessment);


const queryController = require('../controllers/queryController');
router.get('/query', queryController.QueryController_Query);
router.get('/query/pagination', queryController.QueryController_QueryWithPagination);
router.get('/query/search', queryController.QueryController_Search);


module.exports = router;