import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { goerli } from "viem/chains";

const config = createConfig(
  getDefaultConfig({
    infuraId: process.env.REACT_APP_INFURA_ID,
    walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
    appName: "loGHO",
    chains: [goerli],

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

export { config };
export default FamilyWallet;
