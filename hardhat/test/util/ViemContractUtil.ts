import hre from "hardhat";

type ContractType = Awaited<ReturnType<typeof hre.viem.deployContract>>;

async function deployMockERC20(name: string): Promise<ContractType> {
  return await hre.viem.deployContract("MockERC20", [name, name]);
}

async function deployGhoToken(adminAddress: string): Promise<ContractType> {
  return await hre.viem.deployContract("GhoToken", [adminAddress]);
}

async function deployLoGHOFacilitator(
  ghoTkAddr: string,
  vaultAddr: string,
  ghoTreAddr: string,
  bucketCapacity: number,
  fee: number
): Promise<ContractType> {
  return await hre.viem.deployContract("LoGHOFacilitator", [
    ghoTkAddr,
    vaultAddr,
    ghoTreAddr,
    bucketCapacity,
    fee,
  ]);
}

async function deployLoGHOVault(
  ghoTkAddr: string,
  ghoTreAddr: string,
  iSKeAddr: string,
  uSDeAddr: string,
  eUReAddr: string,
  gBPeAddr: string
): Promise<ContractType> {
  return await hre.viem.deployContract("LoGHOVault", [
    ghoTkAddr,
    ghoTreAddr,
    iSKeAddr,
    uSDeAddr,
    eUReAddr,
    gBPeAddr,
  ]);
}

interface DeployedContracts {
  usde: ContractType;
  gbpe: ContractType;
  eure: ContractType;
  iske: ContractType;
  ghoToken: ContractType;
  loGHOVault: ContractType;
  loGHOFacilitator: ContractType;
}

async function deployAllContracts(
  adminAddress: string,
  treasuryAddress: string,
  bucketCapacity: number,
  fee: number
): Promise<DeployedContracts> {
  const usde = await deployMockERC20("USDE");
  const gbpe = await deployMockERC20("GBPE");
  const eure = await deployMockERC20("EURE");
  const iske = await deployMockERC20("ISKE");

  const ghoToken = await deployGhoToken(adminAddress);
  const loGHOVault = await deployLoGHOVault(
    ghoToken.address,
    treasuryAddress,
    iske.address,
    usde.address,
    eure.address,
    gbpe.address
  );

  const loGHOFacilitator = await deployLoGHOFacilitator(
    ghoToken.address,
    loGHOVault.address,
    treasuryAddress,
    bucketCapacity,
    fee
  );

  return {
    usde,
    gbpe,
    eure,
    iske,
    ghoToken,
    loGHOVault,
    loGHOFacilitator,
  };
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
  const [adminAcc, treasuryAcc] = await hre.viem.getWalletClients();
  const contracts = await deployAllContracts(
    adminAcc.account.address,
    treasuryAcc.account.address,
    bucketCapacity,
    fee
  );
  return {
    adminAcc: adminAcc.account.address,
    treasuryAcc: treasuryAcc.account.address,
    contracts,
  };
}

export {
  deployAllContracts,
  deployGhoToken,
  deployLoGHOFacilitator,
  deployLoGHOVault,
  deployMockERC20,
  setupIntegration,
};
