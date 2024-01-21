// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "ds-test/test.sol";
import "forge-std/Test.sol";
import {LoGHOVault} from "../src/logho/LoGHOVault.sol";
import {LoGHOFacilitator} from "../src/logho/LoGHOFacilitator.sol"; 
import {GhoToken} from "../src/gho/GhoToken.sol"; 
import {MockERC20} from "../src/MockERC20.sol";


contract LoGHOFacilitatorTest is Test {
    LoGHOFacilitator facilitator;
    GhoToken ghoToken;
    LoGHOVault vault;
    MockERC20 usde;
    address ghoTreasury = address(0x1);
    address admin = address(0x2);
    address user1 = address(0x3);
    address user2 = address(0x4);
    address facilitatorAddress;
    address vaultAddress;
    uint256 redemptionFee = 50;

    function setUp() public {
        ghoToken = new GhoToken(admin);
        address ghoTokenAddress = address(ghoToken);

        usde = new MockERC20("USDe", "USDe");
        address usdeAddress = address(usde);

        vault = new LoGHOVault(usde, ghoTreasury, usdeAddress,redemptionFee,ghoTokenAddress);
        vaultAddress = address(vault);

        uint128 bucketCapacity = 1000;

        facilitator = new LoGHOFacilitator(ghoTokenAddress, vaultAddress, ghoTreasury, bucketCapacity, redemptionFee, "LoGHO Facilitator");
        facilitatorAddress = address(facilitator);
        vault.setFacilitator(facilitatorAddress);

        vm.startPrank(admin);
        ghoToken.addFacilitator(facilitatorAddress, facilitator.label(),10000);
    }

    function testSetup() public {
        //'Gho Token', 'GHO'
        assertEq(usde.name(), "USDe");
        assertEq(usde.symbol(), "USDe");

        assertEq(ghoToken.name(), "Gho Token");
        assertEq(ghoToken.symbol(), "GHO");
    }

    function testUSDeMint() public {
        vm.startPrank(user1);
        usde.mint(user1, 100);
        assertEq(usde.balanceOf(user1),100);
    }

    function testGHOMint() public {
        vm.startPrank(facilitatorAddress);
        ghoToken.mint(user1, 100);
        assertEq(ghoToken.balanceOf(user1),100);
    }

    function testVaultUSDeDeposit() public {
        vm.startPrank(user1);
        usde.mint(user1, 100);
        assertEq(usde.balanceOf(user1),100);

        usde.approve(address(vault), 100);

        uint256 initialShares = vault.balanceOf(user1);

        vault.depositUSDe(100);

        assertEq(ghoToken.balanceOf(user1), 100);
        assertEq(usde.balanceOf(user1),0);
        assertEq(usde.balanceOf(vaultAddress),100);
        assertEq(vault.balanceOf(user1),100);
        assertEq(vault.totalSupply(),100);
        
        uint256 expectedShares = vault.convertToShares(100); // Assuming such a function exists
        uint256 finalShares = vault.balanceOf(user1);

        assertEq(finalShares - initialShares, expectedShares);

        // assert on GHO mint
        assertEq(ghoToken.balanceOf(user1),100);
    }



function testVaultUSDeRedeem() public {
    // Given user1 has 100 USDe
    vm.startPrank(user1);
    usde.mint(user1, 100);

    // And user1 deposits 100 USDe
    usde.approve(address(vault), 100);
    vault.depositUSDe(100);
    assertEq(ghoToken.balanceOf(user1), 100);

    // When user1 redeems shares
    vault.redeemUsde(100, user1);
    
    // Then user1 has 99.5 USDe (considering a 0.5% redemption fee)
    uint256 redemptionFee = 50; // 0.5% of 100
    uint256 expectedBalance = 10000 - redemptionFee;
    // assertEq(usde.balanceOf(user1), expectedBalance * 10 ** usde.decimals());
    assertGt(usde.balanceOf(ghoTreasury), 0);

    // If you also want to check GHO Token balance, make sure to use the correct expected value
    // assertEq(ghoToken.balanceOf(user1), 0);

    vm.stopPrank();
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
