//LoGHOFacilitatorVault
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {GhoToken} from "../src/gho/GHOToken.sol";
import {LoGHOFacilitatorVault} from "../src/logho/LoGHOFacilitatorVault.sol";

contract LoGHOFacilitatorVaultScript is Script {
    GhoToken public ghoToken;
    LoGHOFacilitatorVault public facilitatorVault;

    uint256 redemptionFee = vm.envUint("REDEPTION_FEE");
    uint128 bucketCapacity = 50;
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    address usde = vm.envAddress("USDE_ADDRESS");
    address ghoTreasury = vm.envAddress("GHO_TREASURY_ADDRESS");
    address admin = vm.envAddress("ADMIN_ADDRESS");

    function setUp() public {
        console2.log("Setting up script...");
        redemptionFee = vm.envUint("REDEPTION_FEE");
        bucketCapacity = 50;
        deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        usde = vm.envAddress("USDE_ADDRESS");
        ghoTreasury = vm.envAddress("GHO_TREASURY_ADDRESS");
        admin = vm.envAddress("ADMIN_ADDRESS");
    }

    function run() public {

        console2.log("running script...");
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy GhoToken
        console2.log("Deploying GhoToken...");
        ghoToken = new GhoToken(admin);
        console2.log("Deployed GhoToken at:", address(ghoToken));

        // Deploy LoGHOFacilitatorVault
        console2.log("Deploying LoGHOFacilitatorVault...");

        facilitatorVault = new LoGHOFacilitatorVault
        (address(ghoToken), ghoTreasury, bucketCapacity, "LoGHO Facilitator", usde, redemptionFee);
        console2.log("Deployed LoGHOFacilitatorVault at:", address(facilitatorVault));

        ghoToken.addFacilitator(address(facilitatorVault), facilitatorVault.label(),bucketCapacity);
        console2.log("Added facilitator to GhoToken");
        vm.stopBroadcast();
    }
}
