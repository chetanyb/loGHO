const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CustomFacilitator", function () {
  let _customFacilitator, customFacilitator;
  let owner, addr1;
  let ghoToken, vault;
  const label = "TestLabel";
  const bucketCapacity = 1000;

  beforeEach(async function () {
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockERC20 = await MockERC20.deploy("MockToken", "MTK");

    // Deploy CustomVault
    const CustomVault = await ethers.getContractFactory("CustomVault");
    customVault = await CustomVault.deploy(
      mockERC20.address,
      "Custom Vault",
      "CVT"
    );

    [owner, addr1] = await ethers.getSigners();

    _customFacilitator = await ethers.getContractFactory("CustomFacilitator");
    customFacilitator = await _customFacilitator.deploy(
      ghoToken.address,
      vault.address,
      owner.address, // Assuming owner is the initial GhoTreasury
      label,
      bucketCapacity,
      100 // Fee
    );
  });

  describe("Deployment", function () {
    it("Should set the right ghoTreasury", async function () {
      expect(await customFacilitator.getGhoTreasury()).to.equal(owner.address);
    });

    it("Should set the right label and bucketCapacity", async function () {
      expect(await customFacilitator.label()).to.equal(label);
      expect(await customFacilitator.bucketCapacity()).to.equal(bucketCapacity);
    });
  });

  describe("Functionality", function () {
    it("Should update GhoTreasury correctly", async function () {
      await customFacilitator.updateGhoTreasury(addr1.address);
      expect(await customFacilitator.getGhoTreasury()).to.equal(addr1.address);
    });

    it("Should distribute fees to the GhoTreasury", async function () {
      await customFacilitator
        .distributeFeesToTreasury()
        .to.emit(customFacilitator, "FeesDistributedToTreasury")
        .withArgs(owner.address, ghoToken.address, 100);
    });

    it("Should mint GhoToken based on vault's verification", async function () {
      vault.setupVerifyFunds(true); // Mock function to simulate fund verification
      expect(await ghoToken.balanceOf(addr1.address)).to.equal(0);
      await customFacilitator.mintGho(addr1.address, 1000);
      expect(await ghoToken.balanceOf(addr1.address)).to.equal(1000);
    });
  });
});
