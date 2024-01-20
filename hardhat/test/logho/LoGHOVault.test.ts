import { setupIntegration } from "../util/ContractUtil";
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
    const [fromWalletClient, toWalletClient] =
      await hre.viem.getWalletClients();
    console.log("fromWalletClient: ", fromWalletClient);
    console.log("toWalletClient: ", toWalletClient);

    usde.write.mint(fromWalletClient, depositAmount);
    const balance = await usde.read.balanceOf(toWalletClient.account.address);
    expect(balance).to.equal(depositAmount);
  });
});
