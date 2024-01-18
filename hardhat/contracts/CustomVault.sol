pragma solidity 0.8.20;

import "@rari-capital/solmate/src/mixins/ERC4626.sol";

contract CustomVault is ERC4626 {

    // a mapping that checks if a user has deposited the token
    mapping(address => uint256) public shareHolder;

    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset, _name, _symbol) {}

    /**
     * @notice function to deposit assets and receive vault tokens in exchange
     * @param _assets amount of the asset token
     */
    function _deposit(uint _assets) public {
        require(_assets > 0, "Deposit less than Zero");
        deposit(_assets, msg.sender);
        shareHolder[msg.sender] += _assets;
    }

    /**
     * @notice Function to allow msg.sender to withdraw their deposit plus accrued interest
     * @param _shares amount of shares the user wants to convert
     * @param _receiver address of the user who will receive the assets
     */
    function _withdraw(uint _shares, address _receiver) public {
        require(_shares > 0, "withdraw must be greater than Zero");
        require(_receiver != address(0), "Zero Address");
        require(shareHolder[msg.sender] > 0, "Not a share holder");
        require(shareHolder[msg.sender] >= _shares, "Not enough shares");

        uint256 percent = (10 * _shares) / 100;
        uint256 assets = _shares + percent;
        redeem(assets, _receiver, msg.sender);
        shareHolder[msg.sender] -= _shares;
    }

    // returns total number of assets
    function totalAssets() public view override returns (uint256) {
        return asset.balanceOf(address(this));
    }

    // returns total balance of user
    function totalAssetsOfUser(address _user) public view returns (uint256) {
        return asset.balanceOf(_user);
    }


    function verifyFunds(to, amount) public returns (bool){
        return shareHolder[to] >= amount;
    }

}