import { ethers } from "@nomiclabs/hardhat-ethers";
import { Signer } from "ethers";

async function deployMockERC20(name: string): Promise<Contract> {
  const MockERC20: ContractFactory = await ethers.getContractFactory(
    "MockERC20"
  );
  const mockERC20: Contract = await MockERC20.deploy(name, name);
  await mockERC20.deployed();
  return mockERC20;
}

async function deployGhoToken(adminAddress: string): Promise<Contract> {
  const GhoToken: ContractFactory = await ethers.getContractFactory("GhoToken");
  const ghoToken: Contract = await GhoToken.deploy(adminAddress);
  await ghoToken.deployed();
  return ghoToken;
}

async function deployLoGHOFacilitator(
  ghoTkAddr: string,
  vaultAddr: string,
  ghoTreAddr: string,
  bucketCapacity: number,
  fee: number
): Promise<Contract> {
  const LoGHOFacilitator: ContractFactory = await ethers.getContractFactory(
    "LoGHOFacilitator"
  );
  const loGHOFacilitator: Contract = await LoGHOFacilitator.deploy(
    ghoTkAddr,
    vaultAddr,
    ghoTreAddr,
    bucketCapacity,
    fee
  );
  await loGHOFacilitator.deployed();
  return loGHOFacilitator;
}

async function deployLoGHOVault(
  ghoTkAddr: string,
  ghoTreAddr: string,
  iSKeAddr: string,
  uSDeAddr: string,
  eUReAddr: string,
  gBPeAddr: string
): Promise<Contract> {
  const LoGHOVault: ContractFactory = await ethers.getContractFactory(
    "LoGHOVault"
  );
  const loGHOVault: Contract = await LoGHOVault.deploy(
    ghoTkAddr,
    ghoTreAddr,
    iSKeAddr,
    uSDeAddr,
    eUReAddr,
    gBPeAddr
  );
  await loGHOVault.deployed();
  return loGHOVault;
}

interface DeployedContracts {
  usde: Contract;
  gbpe: Contract;
  eure: Contract;
  iske: Contract;
  ghoToken: Contract;
  loGHOVault: Contract;
  loGHOFacilitator: Contract;
}

async function deployAllContracts(
  adminAddress: string,
  treasuryAddress: string,
  bucketCapacity: number,
  fee: number
): Promise<DeployedContracts> {
  const usde: Contract = await deployMockERC20("USDE");
  const gbpe: Contract = await deployMockERC20("GBPE");
  const eure: Contract = await deployMockERC20("EURE");
  const iske: Contract = await deployMockERC20("ISKE");

  const ghoToken: Contract = await deployGhoToken(adminAddress);
  const loGHOVault: Contract = await deployLoGHOVault(
    ghoToken.address,
    treasuryAddress,
    iske.address,
    usde.address,
    eure.address,
    gbpe.address
  );
  const loGHOFacilitator: Contract = await deployLoGHOFacilitator(
    ghoToken.address,
    loGHOVault.address,
    treasuryAddress,
    bucketCapacity,
    fee
  );

  return { usde, gbpe, eure, iske, ghoToken, loGHOVault, loGHOFacilitator };
}

interface SetupIntegrationReturn {
  adminAcc: string;
  treasuryAcc: string;
  contracts: DeployedContracts;
}

async function setupIntegration(
  bucketCapacity: number,
  fee: number
): Promise<SetupIntegrationReturn> {
  const signers: Signer[] = await ethers.getSigners();
  const adminAcc: string = await signers[0].getAddress();
  const treasuryAcc: string = await signers[1].getAddress();
  const contracts: DeployedContracts = await deployAllContracts(
    adminAcc,
    treasuryAcc,
    bucketCapacity,
    fee
  );
  return { adminAcc, treasuryAcc, contracts };
}

export {
  deployMockERC20,
  deployGhoToken,
  deployLoGHOVault,
  deployLoGHOFacilitator,
  deployAllContracts,
  setupIntegration,
};
