import { setupIntegration } from "../util/ContractUtils";
import { expect } from "chai";
import hre from "hardhat";

describe("LoGHoVault deposit", function () {
  let adminAcc, treasuryAcc, contracts;
  let usde, gbpe, eure, iske, ghoToken, loGHOVault, loGHOFacilitator;

  before(async function () {
    ({ adminAcc, treasuryAcc, contracts } = await setupIntegration(1000, 100));
    ({ usde, gbpe, eure, iske, ghoToken, loGHOVault, loGHOFacilitator } =
      contracts);
  });

  it("It should deposit all e-money tokens", async function () {
    const depositAmount = 10000;
    usde.write.mint(adminAcc, depositAmount);
    const balance = await usde.read.balanceOf(adminAcc);
    expect(balance).to.equal(depositAmount);
  });
});
