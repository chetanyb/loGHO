// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./gho/interfaces/IGhoFacilitator.sol";
import "./gho/GhoToken.sol";
import "./CustomVault.sol";

contract CustomFacilitator is IGhoFacilitator {
    address public ghoTreasury;
    GhoToken private ghoToken;
    CustomVault private vault;
    string public label;
    uint128 public bucketCapacity;
    uint256 public constant MAX_FEE = 1e4;

    constructor(address _ghoToken, address _vault, address _ghoTreasury, string memory _label, uint128 _bucketCapacity, uint256 fee) {
        require(fee <= MAX_FEE, 'FlashMinter: Fee out of range');
        ghoToken = GhoToken(_ghoToken);
        vault = CustomVault(_vault);
        ghoTreasury = _ghoTreasury;
        label = _label;
        bucketCapacity = _bucketCapacity;
    }

    event FeeUpdated(uint256 oldFee, uint256 newFee);

    function distributeFeesToTreasury() external override {
        uint256 balance = ghoToken.balanceOf(address(this));
        ghoToken.transfer(_ghoTreasury, balance);
        emit FeesDistributedToTreasury(_ghoTreasury, address(GHO_TOKEN), balance);
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
        require(vault.verifyFunds(to, amount), "Insufficient funds in the vault");
        ghoToken.mint(to, amount);
    }

    function _updateFee(uint256 newFee) internal {
            require(newFee <= MAX_FEE, 'FlashMinter: Fee out of range');
            uint256 oldFee = _fee;
            _fee = newFee;
            emit FeeUpdated(oldFee, newFee);
    }

}
