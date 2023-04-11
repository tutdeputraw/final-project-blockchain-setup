'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.prices = ['1215', '135246', '746758', '25252', '134141', '658786', '409494'];
        this.beds = ['1', '2', '3', '4', '5'];
        this.baths = ['1', '2'];
        this.acreLots = ['120', '130', '140', '150', '160'];
        this.streets = ['gunung sari', 'pacet', 'gajah mada', 'mer'];
        this.cities = ['ndarjo', 'ngalam', 'njombang', 'bali'];
        this.states = ['indo', 'jerman', 'jepang', 'korut'];

    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        for (let i = 0; i < this.roundArguments.assets; i++) {
            // const assetID = `${this.workerIndex}_${i}`;
            // console.log(`Worker ${this.workerIndex}: Creating asset ${assetID}`);
            // const request = {
            //     contractId: this.roundArguments.contractId,
            //     contractFunction: 'CreateAsset',
            //     invokerIdentity: 'User1',
            //     contractArguments: [assetID, 'blue', '20', 'penguin', '500'],
            //     readOnly: false
            // };
            // await this.sutAdapter.sendRequests(request);

            const realEstateId = i.toString();
            const ownerId = (i * 10).toString();
            const price = this.prices[i % 2];
            const bed = this.beds[i % 2];
            const bath = this.baths[i];
            const acreLot = this.acreLots[i];
            const fullAddress = GenerateRandomString(10);
            const street = this.streets[i];
            const city = this.cities[i];
            const state = this.states[i];
            const zipCode = city + state
            const houseSize = this.beds[i % 2] * this.baths[i];
            const isOpenToSell = (Math.random() < 0.5).toString();

            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'RealEstate_GetById',
                invokerIdentity: 'User1',
                contractArguments: [realEstateId, ownerId, price, bed, bath, acreLot, fullAddress, street, city, state, zipCode, houseSize, isOpenToSell],
                readOnly: false
            };

            await this.sutAdapter.sendRequests(request);
        }
    }

    async submitTransaction() {
        const randomId = Math.floor(Math.random() * this.roundArguments.assets);

        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'RealEstate_GetById',
            invokerIdentity: 'User1',
            contractArguments: [randomId.toString()],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(myArgs);
    }

    async cleanupWorkloadModule() {
        // nope

        // for (let i = 0; i < this.roundArguments.assets; i++) {
        //     const assetID = i;
        //     console.log(`Worker ${this.workerIndex}: Deleting asset ${assetID}`);
        //     const request = {
        //         contractId: this.roundArguments.contractId,
        //         contractFunction: 'DeleteAsset',
        //         invokerIdentity: 'User1',
        //         contractArguments: [assetID],
        //         readOnly: false
        //     };
        //     await this.sutAdapter.sendRequests(request);
        // }
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;