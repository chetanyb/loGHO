// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC4626} from '@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol';
import {IERC20, ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {GhoToken} from "../gho/GhoToken.sol";
import {LoGHOVaultFee} from "./LoGHOVaultFee.sol";
import {IGhoFacilitator} from "../gho/interfaces/IGhoFacilitator.sol";

contract LoGHOFacilitatorVault is LoGHOVaultFee, IGhoFacilitator {
    GhoToken private ghoToken;
    string public label;
    uint128 public bucketCapacity;
    uint256 public constant MAX_FEE = 1e4;
    IERC20 public USDe;
    IERC20 private _asset;
    address public ghoTreasury;
    uint256 public redeemFee;

    constructor(
        address _ghoToken, 
        address _ghoTreasury, 
        uint128 _bucketCapacity, 
        string memory _label,
        address _asset,
        uint256 _redeemFee
    ) ERC4626(IERC20(_asset)) ERC20('USDe LOGHO Vault Token', 'vUSDe') {
        require(redeemFee <= MAX_FEE, 'FlashMinter: Fee out of range');
        ghoToken = GhoToken(_ghoToken);
        ghoTreasury = _ghoTreasury;
        bucketCapacity = _bucketCapacity;
        label = _label;
        USDe = IERC20(_asset);
        redeemFee = _redeemFee;
    }

    function _exitFeeBasisPoints() internal view override returns (uint256) {
        return redeemFee;
    }

    function _exitFeeRecipient() internal view override returns (address) {
        return ghoTreasury;
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

    function _updateFee(uint256 newFee) internal {
            require(newFee <= MAX_FEE, 'FlashMinter: Fee out of range');
            uint256 oldFee = redeemFee;
            redeemFee = newFee;
            emit FeeUpdated(oldFee, newFee);
    }

    function depositUSDe(uint stableCoins) public {
        require(redeemFee > 0, "Fee must be greater than Zero, wait for LoGHO admin to set fee");
        require(stableCoins > 0, "Deposit less than Zero");
        require(USDe.balanceOf(msg.sender) >= stableCoins, "Not enough USDe tokens to deposit");
        require(stableCoins < bucketCapacity, "Not enough capacity in the bucket");

        deposit(stableCoins, msg.sender);
        ghoToken.mint(msg.sender, stableCoins);
    }

    function redeemUsde(uint256 _shares, address _receiver) public payable{
        require(_shares > 0, "withdraw must be greater than Zero");
        require(maxRedeem(msg.sender) > 0 , "user is not a share holder");
        require(_shares <= maxRedeem(msg.sender), "Redeemable shares exceeded");
        require(_receiver != address(0), "Invalid address");
        require(ghoToken.balanceOf(msg.sender) >= _shares, "Not enough GHO tokens to redeem");
        
        _withdraw(msg.sender, _receiver, msg.sender, _shares, _shares);
        ghoToken.burn(_shares);
    }

}
