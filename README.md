# CarbonNex Decentralized Application (Dapp)

CarbonNex is a carbon credit marketplace exchange aimed at saving the environment.  
   This guide will walk you through building and installing the necessary components to use CarbonNex Decentralized Application (Dapp).

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
   Open a new terminal window don't close the previous terminal.

2. **Change Directory to Carbonnex Folder**
   Navigate to the Carbonnex directory:
   ```bash
   cd /path/to/carbonnex

3. **Install Dependencies**
   Install the necessary packages for the Carbonnex project:
   
   ```bash
   npm install @chakra-ui/react @emotion/react @emotion/styled @hookform/resolvers @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-navigation-menu @radix-ui/react-slot @radix-ui/react-toast @supabase/ssr @supabase/supabase-js @tanstack/react-query @walletconnect/core @web3modal/wagmi class-variance-authority clsx framer-motion lucide-react next pg react react-dom react-hook-form react-icons react-toastify ssl tailwind-merge tailwindcss-animate viem wagmi zod
5. **Run the Development Server**
   Start the development server:
   ```bash
   npm run dev

6. **Access the Application**
   Open your browser and go to http://localhost:3000/.  
   Note: Keep the terminal open while the server is running.

# Below is the component of the system:

## Home Page
The Home Page is the first page of the system.  
   The system will first prompt the user to log in.  
   If the user has not previously signed up or logged in, the admin will need to create an account for them.  
   Users can access various features from the header after login, including:
- Marketplace
- Finance (Staking & Loan)
- Rewards (Ranking & NFT)
- Support (Contact Us & About Us)
- Profile

## Marketplace
In the Marketplace, users can buy or sell CarbonNex credits.  
   This feature facilitates the trading of credits, enabling users to participate in the carbon credit market efficiently.

## Finance
The Finance section enables users to view their rankings and NFT badges.  
   It also provides access to financial tools for managing CarbonNex credits, including staking and loan options.

## Rewards
Users can view and claim their rewards in the Rewards section.  
   This includes checking their current rewards status and redeeming any rewards they have earned through their activities.

## Support
The Support section offers users access to assistance and information.  
   Users can contact support through the "Contact Us" page or learn more about CarbonNex through the "About Us" page.

## Profile
In the Profile section, users can view and manage their personal information.  
   This includes updating their profile details and accessing account settings.
