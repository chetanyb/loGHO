// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import "../src/MockERC20.sol"; // Update with the correct path to your MockERC20 contract

contract MockERC20Test is DSTest {
    MockERC20 token;
    address recipient = address(0x1);

    function setUp() public {
        token = new MockERC20("TestToken", "TTK");
    }

    function testInitialTokenDetails() public {
        assertEq(token.name(), "TestToken");
        assertEq(token.symbol(), "TTK");
        assertEq(token.decimals(), 18);
    }

    function testMint() public {
        uint256 initialBalance = token.balanceOf(recipient);
        uint256 amount = 1000 * 10 ** token.decimals();
        token.mint(recipient, amount);
        uint256 finalBalance = token.balanceOf(recipient);

        assertEq(finalBalance, initialBalance + amount);
    }

    function testFailMintToZeroAddress() public {
        token.mint(address(0), 1000);
    }
}
