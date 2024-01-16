import { ethers } from "hardhat";
import { expect } from "chai";
import { CustomVault } from "../typechain"; // Adjust the path according to your project structure
import { ERC20 } from "../typechain"; // Adjust if necessary

describe("CustomVault", function () {
  let customVault: CustomVault;
  let mockERC20: ERC20;
  let owner: SignerWithAddress, user1: SignerWithAddress;

  beforeEach(async function () {
    // Deploy Mock ERC20 token
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockERC20 = await MockERC20.deploy("MockToken", "MTK");

    // Deploy CustomVault
    const CustomVault = await ethers.getContractFactory("CustomVault");
    customVault = await CustomVault.deploy(
      mockERC20.address,
      "Custom Vault",
      "CVT"
    );

    [owner, user1] = await ethers.getSigners();
  });

  it("should deposit assets correctly", async function () {
    const depositAmount = ethers.utils.parseEther("10");

    await mockERC20.connect(user1).approve(customVault.address, depositAmount);

    await customVault.connect(user1)._deposit(depositAmount);

    expect(await customVault.shareHolder(user1.address)).to.equal(
      depositAmount
    );
  });

  it("should withdraw assets correctly", async function () {
    const depositAmount = ethers.utils.parseEther("10");
    const withdrawShares = ethers.utils.parseEther("5");

    await mockERC20.connect(user1).approve(customVault.address, depositAmount);

    await customVault.connect(user1)._deposit(depositAmount);

    await customVault.connect(user1)._withdraw(withdrawShares, user1.address);

    expect(await customVault.shareHolder(user1.address)).to.equal(
      depositAmount.sub(withdrawShares)
    );
  });
});
