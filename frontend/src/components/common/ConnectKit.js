import { WagmiConfig, createConfig } from "wagmi";
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
