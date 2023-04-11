'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { GenerateRandomString } = require('../helpers/generateRandomString');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.txIndex = -1;
        this.prices = ['1215', '135246', '746758', '25252', '134141', '658786', '409494'];
        this.beds = ['1', '2', '3', '4', '5'];
        this.baths = ['1', '2'];
        this.acreLots = ['120', '130', '140', '150', '160'];
        this.streets = ['gunung sari', 'pacet', 'gajah mada', 'mer'];
        this.cities = ['ndarjo', 'ngalam', 'njombang', 'bali'];
        this.states = ['indo', 'jerman', 'jepang', 'korut'];

    }

    /**
    * Initialize the workload module with the given parameters.
    * @param {number} workerIndex The 0-based index of the worker instantiating the workload module.
    * @param {number} totalWorkers The total number of workers participating in the round.
    * @param {number} roundIndex The 0-based index of the currently executing round.
    * @param {Object} roundArguments The user-provided arguments for the round from the benchmark configuration file.
    * @param {ConnectorBase} sutAdapter The adapter of the underlying SUT.
    * @param {Object} sutContext The custom context object provided by the SUT adapter.
    * @async
    */
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
    }


    async submitTransaction() {
        this.txIndex++;

        const realEstateId = this.txIndex.toString();
        const ownerId = (this.txIndex * 10).toString();
        const price = this.prices[this.txIndex % 2];
        const bed = this.beds[this.txIndex % 2];
        const bath = this.baths[this.txIndex];
        const acreLot = this.acreLots[this.txIndex];
        const fullAddress = GenerateRandomString(10);
        const street = this.streets[this.txIndex];
        const city = this.cities[this.txIndex];
        const state = this.states[this.txIndex];
        const zipCode = city + state
        const houseSize = this.beds[this.txIndex % 2] * this.baths[this.txIndex];
        const isOpenToSell = (Math.random() < 0.5).toString();

        const request = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'RealEstate_RegisterNewRealEstate',
            invokerIdentity: 'User1',
            contractArguments: [realEstateId, ownerId, price, bed, bath, acreLot, fullAddress, street, city, state, zipCode, houseSize, isOpenToSell],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(request);
    }

    async cleanupWorkloadModule() {
        // NOOP
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;