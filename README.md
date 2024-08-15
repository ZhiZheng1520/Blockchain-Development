# CarbonNex Decentralized Application (Dapp)

CarbonNex is a carbon credit marketplace exchange aimed at saving the environment. This guide will walk you through building and installing the necessary components to use CarbonNex Decentralized Application (Dapp).

## Build and Install

### Step 1: Set Up the Backend

1. **Open Terminal**  
   Open your terminal to get started.

2. **Change Directory to Backend Folder**  
   Navigate to the backend folder by using the `cd` command. Example:
   ```bash
   cd /path/to/Backend

3. **Initialize NPM**  
   Run the following command to initialize the project:
   ```bash
   npm init -y

4. **Install Hardhat**  
   Install Hardhat as a development dependency:
   ```bash
   npm install --save-dev hardhat

5. **Initialize Hardhat**  
   Set up Hardhat with the following command:
   ```bash
   npx hardhat init

6. **Start the Hardhat Node**  
   Launch the Hardhat network node:
   ```bash
   npx hardhat node

### Step 2: Set Up Carbonnex

1. **Open a New Terminal**
   ```bash
   Open a new terminal window don't close the previous terminal.

2. **Change Directory to Carbonnex Folder**
   Navigate to the Carbonnex directory:
   ```bash
   cd /path/to/carbonnex

3. **Install Dependencies**
   Install the necessary packages for the Carbonnex project:
   ```bash
   npm install pg
   ```bash
   npm install ethers
   ```bash
   npm install next
   
4. **Run the Development Server**
   Start the development server:
   ```bash
   npm run dev

5. **Access the Application**
   Open your browser and go to http://localhost:3000/.
   Note: Keep the terminal open while the server is running.


## Home Page
The Home Page is the first page of the system. 
Users can access various features from the header, including:
- Marketplace
- Finance (Staking & Loan)
- Rewards (Ranking & NFT)
- Support (Contact Us & About Us)
- Profile

## Marketplace
Users can buy or sell CarbonNex credits in the marketplace.

## Finance
Users can view their Ranking & NFT Badges.

## Rewards
Users can view and claim their rewards.

## Support
Users can contact support or learn more about Carbonnex through the About Us section.

## Profile
Users can view their profile details.
