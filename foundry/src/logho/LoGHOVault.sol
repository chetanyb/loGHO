// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";


contract LoGHOVault is ERC4626 {

    //Gho contracts
    address private ghoToken;
    address private ghoTreasury;
    
    //loGho contracts
    address private facilitator;
    
    //Monerium e-money token contracts
    address private ISKe;
    address private USDe;
    address private EURe;
    address private GBPe;

    // a mapping that checks if a user has deposited the token
    mapping(address => uint256) public userToTokenBalance;

    mapping(address => uint256) public userToShares;

    IERC20 private _asset;

    constructor(
        address _ghoToken,
        address _ghoTreasury,
        address _ISKe,
        address _USDe,
        address _EURe,
        address _GBPe) ERC4626(_asset) ERC20("LoGHO Vault", "LGHOT"){
        ghoToken = _ghoToken;
        ghoTreasury = _ghoTreasury;
        ISKe = _ISKe;
        USDe = _USDe;
        EURe = _EURe;
        GBPe = _GBPe;
    }

    function setFacilitator(address _facilitator) public {
        facilitator = _facilitator;
    }

    function _deposit(uint _assets) public {
        require(_assets > 0, "Deposit less than Zero");
        deposit(_assets, msg.sender);
        userToTokenBalance[msg.sender] += _assets;
    }

    function _withdraw(uint _shares, address _receiver) public {
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