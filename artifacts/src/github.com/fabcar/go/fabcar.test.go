package main

import (
	"fmt"
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/shim"
)

func TestQuerryVehicle(t *testing.T) {
	fmt.Println("Entering TestInvokeInitVehiclePart")

	// Instantiate mockStub using CarDemo as the target chaincode to unit test
	stub := shim.NewMockStub("mockStub", new(CarDemo))
	if stub == nil {
		t.Fatalf("MockStub creation failed")
	}
}
