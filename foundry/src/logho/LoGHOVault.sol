// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import {ERC4626} from '@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {LoGHOFacilitator} from "./LoGHOFacilitator.sol";
import {LoGHOVaultFee} from "./LoGHOVaultFee.sol";
import {GhoToken} from "../gho/GhoToken.sol";


// 1 USDe = 1 share = 1 GHO


contract LoGHOVault is LoGHOVaultFee {

    uint256 private constant _BASIS_POINT_SCALE = 1e4;

    //Gho contracts
    GhoToken private ghoToken;
    //loGho contracts
    LoGHOFacilitator private facilitator;
    uint256 public redeemFee;

    //Monerium e-money token contracts
    IERC20 private USDe;
    IERC20 private _asset;

    // address public ghoTreasury;

    constructor(IERC20 _asset,
        address _ghoTreasury,
        address _USDe,
        uint256 _redeemFee,
        address ghoTokenAddr) ERC4626(_asset) ERC20('USDe LOGHO Vault Token', 'vUSDe'){
        // ghoTreasury = _ghoTreasury;
        USDe = ERC20(_USDe);
        redeemFee = _redeemFee;
        ghoToken = GhoToken(ghoTokenAddr);
    }

    function setFacilitator(address facilitatorAddr) public {
        facilitator = LoGHOFacilitator(facilitatorAddr);
        // redeemFee = facilitator.fee();
    }

    function depositUSDe(uint stableCoins) public {
        require(facilitator != LoGHOFacilitator(address(0)), "Facilitator not set");
        require(redeemFee > 0, "Fee must be greater than Zero, wait for LoGHO admin to set fee");
        require(stableCoins > 0, "Deposit less than Zero");

        deposit(stableCoins, msg.sender);
        facilitator.mintGho(msg.sender, stableCoins);
    }

    function redeemUsde(uint256 _shares, address _receiver) public payable{
        require(_shares > 0, "withdraw must be greater than Zero");
        require(maxRedeem(msg.sender) > 0 , "user is not a share holder");
        require(_shares <= maxRedeem(msg.sender), "Redeemable shares exceeded");
        require(_receiver != address(0), "Invalid address");
        require(ghoToken.balanceOf(msg.sender) >= _shares, "Not enough GHO tokens to redeem");
        
        _withdraw(msg.sender, _receiver, msg.sender, _shares, _shares);
        // ghoToken.burn(_shares);
    }

}