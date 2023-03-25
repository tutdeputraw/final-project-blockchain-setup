const { QueryHelper } = require('../chaincode-sdk/queryHelper');
const helper = require('../chaincode-sdk/helper');
const { RegisterAdminHelper } = require('../chaincode-sdk/registerAdminHelper');
const { RegisterUserHelper } = require('../chaincode-sdk/registerUserHelper');
const { QueryWithPaginationHelper } = require('../chaincode-sdk/queryWithPaginationHelper');
const { InvokeHelper } = require('../chaincode-sdk/invokeHelper');


const UserController_Init = async (req, res) => { }


const UserController_CheckIfUserExist = async (req, res) => { }


const UserController_GetById = async (req, res) => { }


const UserController_GetAll = async (req, res) => { }


const UserController_Create = async (req, res) => { }


module.exports = {
    UserController_Init,
    UserController_CheckIfUserExist,
    UserController_GetById,
    UserController_GetAll,
    UserController_Create,
}