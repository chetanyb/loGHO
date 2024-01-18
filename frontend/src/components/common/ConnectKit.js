import { WagmiConfig, createConfig, mainnet, sepolia } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";

const config = createConfig(
  getDefaultConfig({
    infuraId: process.env.INFURA_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    appName: "loGHO",
    chains: [mainnet, sepolia],

    // Optional
    appDescription: "GHO onramp",
    //appUrl: "https://family.co",
    //appIcon: "https://family.co/logo.png",
  })
);

const FamilyWallet = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default FamilyWallet;
