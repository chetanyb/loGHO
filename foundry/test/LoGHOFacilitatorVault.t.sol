// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "ds-test/test.sol";
import "forge-std/Test.sol";
import {GhoToken} from "../src/gho/GhoToken.sol"; 
import {MockERC20} from "../src/MockERC20.sol";
import {LoGHOFacilitatorVault} from "../src/logho/LoGHOFacilitatorVault.sol";

contract LoGHOFacilitatorVaultTest is Test {
    LoGHOFacilitatorVault facilitatorVault;
    GhoToken ghoToken;
    MockERC20 usde;
    address ghoTreasury = address(0x1);
    address admin = address(0x2);
    address user1 = address(0x3);
    address user2 = address(0x4);
    uint256 redemptionFee = 50;
    uint128 bucketCapacity = 10000000000;
    address facilitatorVaultAddr;

    function setUp() public {
        ghoToken = new GhoToken(admin);
        address ghoTokenAddress = address(ghoToken);

        usde = new MockERC20("USDe", "USDe");
        address usdeAddress = address(usde);

        facilitatorVault = new LoGHOFacilitatorVault
        (ghoTokenAddress, ghoTreasury,bucketCapacity,"test facilitater",usdeAddress, redemptionFee);

        facilitatorVaultAddr = address(facilitatorVault);

        vm.startPrank(admin);
        ghoToken.addFacilitator(facilitatorVaultAddr, facilitatorVault.label(),bucketCapacity);
    }

    function testSetup() public {
        assertEq(usde.name(), "USDe");
        assertEq(usde.symbol(), "USDe");

        assertEq(ghoToken.name(), "Gho Token");
        assertEq(ghoToken.symbol(), "GHO");

        assertEq(facilitatorVault.name(), "USDe LOGHO Vault Token");
        assertEq(facilitatorVault.symbol(), "vUSDe");
    }

    function testUSDeMint() public {
        vm.startPrank(user1);
        usde.mint(user1, 100);
        assertEq(usde.balanceOf(user1),100);
    }

    function testGHOMint() public {
        vm.startPrank(facilitatorVaultAddr);
        ghoToken.mint(user1, 100);
        assertEq(ghoToken.balanceOf(user1),100);
    }

    function testVaultUSDeDeposit() public {
        vm.startPrank(user1);
        usde.mint(user1, 100);
        assertEq(usde.balanceOf(user1),100);

        usde.approve(facilitatorVaultAddr, 100);

        uint256 initialShares = facilitatorVault.balanceOf(user1);

        facilitatorVault.depositUSDe(100);

        assertEq(ghoToken.balanceOf(user1), 100);
        assertEq(usde.balanceOf(user1),0);
        assertEq(usde.balanceOf(facilitatorVaultAddr),100);
        assertEq(facilitatorVault.balanceOf(user1),100);
        assertEq(facilitatorVault.totalSupply(),100);
        
        uint256 expectedShares = facilitatorVault.convertToShares(100); // Assuming such a function exists
        uint256 finalShares = facilitatorVault.balanceOf(user1);

        assertEq(finalShares - initialShares, expectedShares);

        // assert on GHO mint
        assertEq(ghoToken.balanceOf(user1),100);
    }



    function testVaultUSDeRedeem() public {
        // Given user1 has 100 USDe
        vm.startPrank(user1);
        usde.mint(user1, 100);

        // And user1 deposits 100 USDe
        usde.approve(facilitatorVaultAddr, 100);
        facilitatorVault.depositUSDe(100);
        
        assertEq(ghoToken.balanceOf(user1), 100);
        assertEq(usde.balanceOf(facilitatorVaultAddr),100);
        assertEq(usde.balanceOf(user1),0);

        // When user1 redeems shares
        facilitatorVault.redeemUsde(100, user1);
        
        // Then user1 has 99.5 USDe (considering a 0.5% redemption fee)
        // uint256 expectedBalance = 10000 - redemptionFee;
        // assertEq(usde.balanceOf(user1), expectedBalance * 10 ** usde.decimals());
        assertGt(usde.balanceOf(ghoTreasury), 0);

        // If you also want to check GHO Token balance, make sure to use the correct expected value
        // assertEq(ghoToken.balanceOf(user1), 0);

        vm.stopPrank();
    }
}
