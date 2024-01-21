#!/bin/bash

# 1. Build the project
source .env

echo "deploying GHO_TOKEN to goerli network with RPC URL: ${GOERIL_RPC_URL}"

forge create --rpc-url $GOERIL_RPC_URL --private-key $PRIVATE_KEY --constructor-args $ADMIN_ADDRESS --etherscan-api-key $ETHERSCAN_API_KEY --verify src/gho/GhoToken.sol:GhoToken
