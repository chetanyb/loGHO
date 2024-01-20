// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "ds-test/test.sol";
import {LoGHOVault} from "../src/logho/LoGHOVault.sol";
import {LoGHOFacilitator} from "../src/logho/LoGHOFacilitator.sol"; 
import {GhoToken} from "../src/gho/GhoToken.sol"; 
import {MockERC20} from "../src/MockERC20.sol";

contract LoGHOFacilitatorTest is DSTest {
    LoGHOFacilitator facilitator;
    GhoToken ghoToken;
    LoGHOVault vault;
    MockERC20 usde;
    address ghoTreasury = address(0x1);
    address admin = address(0x2);

    function setUp() public {
        ghoToken = new GhoToken(admin);
        address ghoTokenAddress = address(ghoToken);

        usde = new MockERC20("USDe", "USDe");
        address usdeAddress = address(usde);

        vault = new LoGHOVault(admin,ghoTreasury,usdeAddress, usdeAddress, usdeAddress, usdeAddress);
        address vaultAddress = address(vault);

        uint128 bucketCapacity = 1000;
        uint256 fee = 100; // 1% fee for example

        facilitator = new LoGHOFacilitator(admin, address(0x5), ghoTreasury, bucketCapacity, fee);
    }

    function testSetup() public {
        //'Gho Token', 'GHO'
        assertEq(usde.name(), "USDe");
        assertEq(usde.symbol(), "USDe");
    }

    // function testConstructorInitialization() public {
    //     assertEq(facilitator.ghoTreasury(), ghoTreasury);
    //     assertEq(facilitator.bucketCapacity(), 1000);
    //     assertEq(facilitator.fee(), 100); // Add getFee function in contract if necessary
    // }

    // function testUpdateGhoTreasury() public {
    //     address newGhoTreasury = address(0x2);
    //     facilitator.updateGhoTreasury(newGhoTreasury);
    //     assertEq(facilitator.ghoTreasury(), newGhoTreasury);
    // }

    // function testFailUpdateGhoTreasuryWithZeroAddress() public {
    //     facilitator.updateGhoTreasury(address(0));
    // }

    // function testDistributeFeesToTreasury() public {
    //     facilitator.distributeFeesToTreasury();
    // }

    // function testMintGho() public {
    //     address to = address(0x3);
    //     uint256 amount = 1000 * 10 ** ghoToken.decimals();
    //     facilitator.mintGho(to, amount);
    //     assertEq(ghoToken.balanceOf(to), amount);
    // }
}
