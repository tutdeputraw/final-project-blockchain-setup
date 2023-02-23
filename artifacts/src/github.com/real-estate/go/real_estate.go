package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
	"github.com/hyperledger/fabric/common/flogging"
)

type SmartContract struct {
}

type User struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type RealEstate struct {
	Id      string `json:"id"`
	Address string `json:"address"`
}

func (s *SmartContract) Init(APIStub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

var logger = flogging.MustGetLogger("real_estate_cc")

/// Invoke :  Method for INVOKING smart contract
func (s *SmartContract) Invoke(APIStub shim.ChaincodeStubInterface) sc.Response {
	function, args := APIStub.GetFunctionAndParameters()
	logger.Infof("Function name is:  %d", function)
	logger.Infof("Args length is : %d", len(args))

	switch function {
	case "":
	default:
		return shim.Error("Invalid Smart Contract function name.")
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) getAllRealEstate(APIStub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	realEstateAsBytes, _ := APIStub.GetState(args[0])
	return shim.Success(realEstateAsBytes)
}

func (s *SmartContract) createRealEstate(APIStub shim.ChaincodeStubInterface, args []string) sc.Response {
	type realEstateTransientInput struct {
		Id      string `json:"id"`
		Address string `json:"address"`
	}

	if len(args) != 0 {
		return shim.Error("1111111----Incorrect number of arguments. Private marble data must be passed in transient map.")
	}

	transMap, err := APIStub.GetTransient()
	if err != nil {
		return shim.Error("222222 -Error getting transient: " + err.Error())
	}

	realEstateAsBytes, ok := transMap["realEstate"]
	if !ok {
		return shim.Error("car must be a key in the transient map")
	}
	logger.Infof("********************8   " + string(realEstateAsBytes))

	if len(realEstateAsBytes) == 0 {
		return shim.Error("333333 -marble value in the transient map must be a non-empty JSON string")
	}

	logger.Infof("2222222")

	var realEstateInput realEstateTransientInput
	err = json.Unmarshal(realEstateAsBytes, &realEstateInput)
	if err != nil {
		return shim.Error("44444 -Failed to decode JSON of: " + string(realEstateAsBytes) + "Error is : " + err.Error())
	}

	logger.Infof("3333")

	if len(realEstateInput.Id) == 0 {
		return shim.Error("Id field must be a non-empty string")
	}
	if len(realEstateInput.Address) == 0 {
		return shim.Error("Address field must be a non-empty string")
	}

	logger.Infof("444444")

	// ==== Check if car already exists ====
	realEstateAsBytes, err1 := APIStub.GetPrivateData("collectionCars", realEstateInput.Id)
	if err1 != nil {
		return shim.Error("Failed to get marble: " + err.Error())
	} else if realEstateAsBytes != nil {
		fmt.Println("This car already exists: " + realEstateInput.Id)
		return shim.Error("This car already exists: " + realEstateInput.Id)
	}

	logger.Infof("55555")

	var realEstate = RealEstate{Id: realEstateInput.Id, Address: realEstateInput.Address}

	realEstateAsBytes, err = json.Marshal(realEstate)
	if err != nil {
		return shim.Error(err.Error())
	}
	err = APIStub.PutPrivateData("collectionCars", realEstate.Id, realEstateAsBytes)
	if err != nil {
		logger.Infof("6666666")
		return shim.Error(err.Error())
	}

	return shim.Success(realEstateAsBytes)
}
