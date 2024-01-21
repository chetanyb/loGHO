#!/bin/bash

# 1. Build the project
source .env

echo "deploying to goerli network with RPC URL: ${GOERIL_RPC_URL}"


# GOERIL_RPC_URL="https://eth-goerli.g.alchemy.com/v2/My1EWinHji5EQDFqixDX1x78F5NL_RNq"
# ETHERSCAN_API_KEY="MQ3W7BVUSXCRM1DV94XJAJ9YWG9WCKKFXX"
# PRIVATE_KEY="c8406272f9d97e4988aeeecaf433aac9a4850e3b16f5e373c6d6875092a16a6a"

# REDEPTION_FEE=50
# BUCKET_CAPACITY=1000000000000000

# USDE_ADDRESS=0x1b55D077b3459e73354bA2C338425B3A3079fC0f
# GHO_TREASURY_ADDRESS=0x039A1cb65AE4E88aE359Bd05cE42eDDBCaBa1Fcf
# ADMIN_ADDRESS=0xF0c0e1458338DC4CDD5e02b0bEafF74B8c75dc59
# GHO_TOKEN_ADDRESS=0x6e8b5606658D1Dc4780ba7043D7FC7957e155f95

# (address(ghoToken), ghoTreasury, bucketCapacity, "LoGHO Facilitator", usde, redemptionFee);
forge create --rpc-url $GOERIL_RPC_URL --private-key $PRIVATE_KEY --constructor-args $GHO_TOKEN_ADDRESS $GHO_TREASURY_ADDRESS $BUCKET_CAPACITY "LoGHO Facilitator" $USDE_ADDRESS $REDEPTION_FEE --etherscan-api-key $ETHERSCAN_API_KEY --verify src/logho/LoGHOFacilitatorVault.sol:LoGHOFacilitatorVault


# chainId=5