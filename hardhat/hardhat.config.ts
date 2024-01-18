import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.7",
      },
      {
        version: "0.8.20",
      },
    ],
  },
};

export default config;
