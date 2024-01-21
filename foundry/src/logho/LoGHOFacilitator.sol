// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {IGhoFacilitator} from "../gho/interfaces/IGhoFacilitator.sol";
import {GhoToken} from "../gho/GhoToken.sol";
 import {LoGHOVault} from "./LoGHOVault.sol";

contract LoGHOFacilitator is IGhoFacilitator {
    address public ghoTreasury;
    GhoToken private ghoToken;
    LoGHOVault private vault;
    string public label;
    uint128 public bucketCapacity;
    uint256 public constant MAX_FEE = 1e4;
    uint256 public fee;


    uint256 private constant _BASIS_POINT_SCALE = 1e4;

    //loGho contracts
    LoGHOFacilitator private facilitator;
    

    constructor(address _ghoToken, address _vault, address _ghoTreasury, uint128 _bucketCapacity, uint256 _fee, string memory _label) {
        fee = _fee;
        require(fee <= MAX_FEE, 'FlashMinter: Fee out of range');
        ghoToken = GhoToken(_ghoToken);
        vault = LoGHOVault(_vault);
        ghoTreasury = _ghoTreasury;
        bucketCapacity = _bucketCapacity;
        label = _label;
    }

    event FeeUpdated(uint256 oldFee, uint256 newFee);

    function distributeFeesToTreasury() external override {
        uint256 balance = ghoToken.balanceOf(address(this));
        ghoToken.transfer(ghoTreasury, balance);
        emit FeesDistributedToTreasury(ghoTreasury, address(ghoToken), balance);
    }

    function updateGhoTreasury(address newGhoTreasury) external override {
        require(newGhoTreasury != address(0), "Invalid address");
        address oldGhoTreasury = ghoTreasury;
        ghoTreasury = newGhoTreasury;
        emit GhoTreasuryUpdated(oldGhoTreasury, newGhoTreasury);
    }

    function getGhoTreasury() external view override returns (address) {
        return ghoTreasury;
    }

    function mintGho(address to, uint256 amount) public {
        require(msg.sender == address(vault), "Only vault can mint GHO");
        ghoToken.mint(to, amount);
    }

    function _updateFee(uint256 newFee) internal {
            require(newFee <= MAX_FEE, 'FlashMinter: Fee out of range');
            uint256 oldFee = fee;
            fee = newFee;
            emit FeeUpdated(oldFee, newFee);
    }

}
