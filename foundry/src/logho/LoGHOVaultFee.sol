// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "forge-std/console.sol";


/// @dev ERC4626 vault with entry/exit fees expressed in https://en.wikipedia.org/wiki/Basis_point[basis point (bp)].
abstract contract LoGHOVaultFee is ERC4626 {
    using Math for uint256;

    uint256 private constant BASIS_POINT_SCALE = 1e4;

    // === Overrides ===
    /// @dev Preview adding an exit fee on withdraw. See {IERC4626-previewWithdraw}.
    function previewWithdraw(uint256 assets) public view virtual override returns (uint256) {
        uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());
        return super.previewWithdraw(assets + fee);
    }

    /// @dev Preview taking an exit fee on redeem. See {IERC4626-previewRedeem}.
    function previewRedeem(uint256 shares) public view virtual override returns (uint256) {
        uint256 assets = super.previewRedeem(shares);
        return assets - _feeOnTotal(assets, _exitFeeBasisPoints());
    }

    /// @dev Send exit fee to {_exitFeeRecipient}. See {IERC4626-_deposit}.
    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal virtual override {
        uint256 fee = _feeOnRaw(assets, _exitFeeBasisPoints());

        address recipient = _exitFeeRecipient();

        super._withdraw(caller, receiver, owner, assets, shares);

        ERC20 assetCoin = ERC20(asset());

        // console.log(">>>>>>>>> balance of user  %s", assetCoin.balanceOf(caller));
        // console.log(">>>>>>>>>>>>>>>> coin label", assetCoin.name());
        // console.log(">>>>>>>>>>>>>>>> vault balance: ", assetCoin.balanceOf(address(this)));

        if (fee > 0 && recipient != address(this)) {
            SafeERC20.safeTransfer(IERC20(asset()), recipient, fee);
        }
    }

    /// @dev Send exit fee to {_exitFeeRecipient}.
    function _exitFeeBasisPoints() internal view virtual returns (uint256) {
        return 0; // replace with e.g. 100 for 1%
    }

    /// @dev Send exit fee to {_exitFeeRecipient}.
    function _exitFeeRecipient() internal view virtual returns (address) {
        return address(0x0); // replace with e.g. a treasury address
    }

    // @dev Calculate exit fee.
    function _feeOnRaw(uint256 assets, uint256 feeBasisPoints) private pure returns (uint256) {
        return assets.mulDiv(feeBasisPoints, BASIS_POINT_SCALE, Math.Rounding.Ceil);
    }

    // @dev Calculate exit fee total
    function _feeOnTotal(uint256 assets, uint256 feeBasisPoints) private pure returns (uint256) {
        return assets.mulDiv(feeBasisPoints, feeBasisPoints + BASIS_POINT_SCALE, Math.Rounding.Ceil);
    }
}