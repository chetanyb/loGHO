// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
//"../../lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC4626.sol"
import {ERC4626} from '@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {LoGHOFacilitator} from "./LoGHOFacilitator.sol";
import "forge-std/console.sol";


// 1 USDe = 1 share = 1 GHO


contract LoGHOVault is ERC4626 {

    uint256 private constant _BASIS_POINT_SCALE = 1e4;
    //Gho contracts
    address private ghoToken;
    address private ghoTreasury;
    
    //loGho contracts
    LoGHOFacilitator private facilitator;
    
    //Monerium e-money token contracts
    IERC20 private USDe;

    // a mapping that checks if a user has deposited the token
    mapping(address => uint256) public userToTokenBalance;

    mapping(address => uint256) public userToShares;

    IERC20 private _asset;
    uint256 private treasuryFee;

        // address _ghoToken,
        // address _ghoTreasury,
        // address _USDe

    constructor(IERC20 _asset,
        address _ghoTreasury,
        address _USDe) ERC4626(_asset) ERC20('USDe LOGHO Vault Token', 'vUSDe'){
        ghoTreasury = _ghoTreasury;
        USDe = ERC20(_USDe);
    }

    function setFacilitator(address facilitatorAddr) public {
        facilitator = LoGHOFacilitator(facilitatorAddr);
        treasuryFee = facilitator.fee();
    }

    function depositUSDe(uint stableCoins) public {
        require(facilitator != LoGHOFacilitator(address(0)), "Facilitator not set");
        require(treasuryFee > 0, "Fee must be greater than Zero");
        require(stableCoins > 0, "Deposit less than Zero");

        uint256 fee = stableCoins * 5 / 1000; // 0.5% fee
        require(USDe.transferFrom(msg.sender, ghoTreasury, fee), "Fee transfer failed");

        deposit(stableCoins, msg.sender);
        facilitator.mintGho(msg.sender, stableCoins);
    }

    function withdrawUSDe(uint _shares, address _receiver) public {
        // require(_shares > 0, "withdraw must be greater than Zero");
        // require(_receiver != address(0), "Zero Address");
        // require(shareHolder[msg.sender] > 0, "Not a share holder");
        // require(shareHolder[msg.sender] >= _shares, "Not enough shares");

        // uint256 percent = (10 * _shares) / 100;
        // uint256 assets = _shares + percent;
        // redeem(assets, _receiver, msg.sender);
        // userToTokenBalance[msg.sender] -= _shares;
    }

}