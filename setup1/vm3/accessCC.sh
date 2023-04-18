export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../vm4/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_ORG3_CA=${PWD}/crypto-config/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/../../artifacts/channel/config/

export CHANNEL_NAME=mychannel

setGlobalsForPeer0Org3() {
    export CORE_PEER_LOCALMSPID="Org3MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/crypto-config/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
    export CORE_PEER_ADDRESS=localhost:11051

}

setGlobalsForPeer1Org3() {
    export CORE_PEER_LOCALMSPID="Org3MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/crypto-config/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
    export CORE_PEER_ADDRESS=localhost:12051

}

query() {
    export CC_NAME=real_estate

    setGlobalsForPeer0Org3
    
    peer chaincode query \
    -C $CHANNEL_NAME \
    -n $CC_NAME \
    -c '{"function": "RealEstate_GetAll","Args":[]}'
}
# query

invoke() {
    export CC_NAME=real_estate

    setGlobalsForPeer0Org3

    peer chaincode invoke -o $VM_4:7050 \
    --ordererTLSHostnameOverride orderer.example.com \
    --tls \
    --cafile $ORDERER_CA \
    -C mychannel -n ${CC_NAME} \
    --peerAddresses peer0.org3.example.com:11051 --tlsRootCertFiles $PEER0_ORG3_CA  \
    -c '{"function": "User_Create","Args":["8080", "advisorname", "4567654", "08928495429", "advisoremail"]}'
}
invoke
