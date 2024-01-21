# LoGHO - On-Ramp GHO Facilitator

Revolutionizing crypto access with no on-ramp fees, free GHO minting, and 1:1 USD-based stablecoin mint value. Enjoy easy GHO onboarding, liquidity benefits, and governance incentives.



#### Description

loGHO is an innovative project designed to simplify and enhance the process of accessing GHO, the decentralized, multi-collateral stablecoin native to the Aave Protocol. It aims to remove barriers typically associated with entering the cryptocurrency space while also providing incentive structures to use GHO, particularly for those who do not already possess crypto assets or experience in the field. Here's a detailed breakdown of what loGHO is and how it functions:

Seamless Onboarding to GHO and Crypto: loGHO is designed as a platform that allows users to obtain GHO and engage with the crypto ecosystem without the need for pre-existing crypto holdings or navigating complex processes. It offers an accessible entry point for new users into the world of decentralized finance (DeFi).

Stablecoin Backed GHO Facilitator: As a stablecoin-backed GHO facilitator, loGHO provides ample collateral to ensure user needs are met and safeguards against liquidity shortages and bank run scenarios. This stability is crucial for building user trust and promoting wider adoption of GHO.

Cost-Efficient Transactions: One of the key features of loGHO is its cost-effective transaction model. It eliminates common fees associated with crypto transactions, including on-ramp fees for converting fiat to crypto and GHO minting fees. This approach ensures users receive full value for their transactions, making the platform more attractive and accessible.

Arbitrage Opportunities and GHO Peg Assurance: loGHO assures a 1:1 mint value for USD-based stablecoins, which not only ensures the stability of GHO's peg to the US dollar but also opens up potential arbitrage opportunities for users.

Exit Load Fee Structure: The platform charges a nominal exit load fee of 0.5% when users redeem GHO against other desired stablecoins. This fee structure is designed to be straightforward and user-friendly.

Revenue Allocation: The fees generated from user transactions are distributed in two ways:
a. A portion is allocated to the governance treasury and community, creating an incentive structure for users to deposit into loGHO.
b. The remaining funds are directed into the platform vault to sustain transactions with more liquidity.

User Incentives and Governance Participation: Users are incentivized to continue using GHO due to the cost-effective minting process and to avoid the exit load fees. Additionally, they can earn rewards and participate in governance decisions, further integrating them into the ecosystem.

Future Development Prospects: loGHO plans to expand its functionality by:
a. Building upon the GHO Peg Stability Module to become a more comprehensive platform.
b. Enabling GHO payments without the need for a wallet or crypto, by setting up external addresses during minting, thereby simplifying the payment process.

Benefits of Incorporating Monerium e-money: Incorporating Monerium’s e-money offers additional benefits such as enhanced safety, legal compliance, and flexibility. This integration could further streamline financial transactions and promote the adoption of GHO.

Addressing the Need for More Facilitators: Currently, Aave V3 is the primary facilitator for minting GHO, which could potentially lead to a perpetual borrowing cycle. The introduction of loGHO as a stable facilitator provides an alternative avenue for obtaining GHO, thereby contributing to a more mature and diversified GHO ecosystem.
E-Money is overcollateralized by 102%, LoGHO Facilitators help GHO stability through 0.5% exit load fees (redemption)

Liquidity and Ecosystem Growth: loGHO aims to bring liquidity from other stablecoins to GHO through its reward system and exit load structure, thereby enriching the overall Aave ecosystem.

loGHO stands out as a project that not only makes it easier for users to access and utilize GHO but also contributes to the growth and stability of the broader Aave ecosystem. Its user-friendly approach, combined with the strategic integration of Monerium's e-money, positions loGHO as a significant facilitator in the DeFi space, especially for those new to cryptocurrencies.

#### Overview

The loGHO project is intricately designed with a focus on creating a streamlined and efficient user experience, primarily through a single dashboard-based interface. This design choice allows users to access all necessary information and perform various interactions in one place, enhancing convenience and usability. Here's an overview of how the project was built, including the technologies used and their integration:

Single Dashboard Interface: Central to loGHO is a user-friendly, single dashboard interface where all platform interactions occur. This design ensures that users can easily navigate through the platform, access important information, and perform transactions without the need to switch between different pages or sections.

Technology Stack and Integration:

Monerium Integration for Fiat-to-Crypto Conversion: The integration with Monerium plays a pivotal role in the project, enabling users to easily convert fiat currency into crypto assets. This feature is crucial for newcomers to the crypto space who might not have existing crypto holdings.
ConnectKit Wallet for User Interactions: The use of ConnectKit, a wallet interface, enhances the user experience by providing a simple and secure way to interact with the loGHO platform. It facilitates the management of crypto assets and transactions within the loGHO ecosystem.
GHO-Core Contracts Modification: Tailoring the GHO-core contracts is a significant aspect of the project. These modifications are necessary to align the platform's functionalities with the expected user requirements and to integrate seamlessly with Monerium’s services.
User Journey on the Platform:

User Onboarding and Asset Management: The process starts with user sign-up and wallet connection, followed by options to mint GHO against their preferred stablecoins.
ERC-4626 Interest Bearing Vault for Asset Deposit: User funds are managed through an ERC-4626 interest-bearing vault, a standard for tokenized vaults in Ethereum. This approach allows for efficient and transparent asset management.
vTokens for Asset Tracking and Redemption: Upon depositing funds, users receive vTokens, which serve as a mechanism to track and later redeem their deposit.
Withdrawal Process with Token Burning: For withdrawals, users provide vTokens and an equivalent amount of GHO tokens to be burned, ensuring a balanced and secure transaction process.
Notable Technical Features:

Comprehensive Integration: The project’s strength lies in the comprehensive integration of different technologies and services, ensuring a seamless and cohesive user experience.
Focus on User Experience (UX): A significant emphasis is placed on UX, with the single dashboard design being a testament to the project's user-centric approach.
In summary, loGHO is built using a combination of blockchain technology, strategic partnerships, and a focus on user experience. The integration of Monerium's on-ramping services, ConnectKit wallet, and modifications to GHO-core contracts, all centered around a single, user-friendly dashboard, highlights the project's commitment to making crypto transactions accessible and straightforward.

#### How to run frontend

1) go into the react project
```
cd frontend
```
2) create a .env file with the following parameters including monerium secrets
```
REACT_APP_INFURA_ID = 
REACT_APP_WALLETCONNECT_PROJECT_ID = 
REACT_APP_MONERIUM_CLIENT_ID = 
REACT_APP_MONERIUM_CLIENT_SECRET = 
REACT_APP_FOREX_RATE_API_KEY = 
```

3) build all dependencies including ethers connectkit daisy ui tailwind and monerium
```
npm install --force
```
3) Run the server
```
npm  run
```


#### How to deploy contracts
1) go into the foundry project
```
cd foundry
```
2) create a .env file with the following parameters
```
GOERIL_RPC_URL=""
ETHERSCAN_API_KEY=""
PRIVATE_KEY=""

REDEPTION_FEE=
BUCKET_CAPACITY=

USDE_ADDRESS=
GHO_TREASURY_ADDRESS=
ADMIN_ADDRESS=
GHO_TOKEN_ADDRESS=
```

3) build the project
```
forge build
```
3) deploy the GHOToken
```
./deploy_gho_token.sh
```
4) deploy the LoGHOFacilitatorVault
```
./deploy_facilitator_vault.sh
```
#### How to test
1) go into the foundry project
```
cd foundry
```
2) run tests
```
forge test
```
#### Deployed contracts
USDe https://etherscan.io/token/0xbc5142e0cc5eb16b47c63b0f033d4c2480853a52
LoGHOFacilitatorVault https://goerli.etherscan.io/address/0x68da486c8b6d249a09314b7a716c901136755a54#code
GHOToken https://goerli.etherscan.io/address/0x6e8b5606658d1dc4780ba7043d7fc7957e155f95#code

#### Resources
Monerium
https://github.com/monerium/smart-contracts
https://monerium.github.io/js-sdk/

