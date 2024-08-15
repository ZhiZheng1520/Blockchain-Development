# Sell Carbonnex

Carbonnex is a carbon credit aimed at saving the environment. This guide will walk you through building and installing the necessary components to start using Carbonnex.

## Build and Install

### Step 1: Set Up the Backend

1. **Open Terminal**  
   Open your terminal to get started.

2. **Change Directory to Backend Folder**  
   Navigate to the backend folder by using the `cd` command. Example:
   ```bash
   cd /path/to/Backend

4. **Change Directory to Backend Folder**  
   Run the following command to initialize the project:
   ```bash
   npm init -y

5. **Install Hardhat**  
   Install Hardhat as a development dependency:
   ```bash
   npm install --save-dev hardhat

6. **Initialize Hardhat**  
   Set up Hardhat with the following command:
   ```bash
   npx hardhat init

7. **Start the Hardhat Node**  
   Launch the Hardhat network node:
   ```bash
   npx hardhat node

### Step 2: Set Up Carbonnex
1. **Open a New Terminal**
   ```bash
   Open a new terminal window.

3. **Change Directory to Carbonnex Folder**
   Navigate to the Carbonnex directory:
   ```bash
   cd /path/to/carbonnex

4. **Install Dependencies**
5. Install the necessary packages for the Carbonnex project:
   ```bash
   npm install pg
   npm install ethers
   npm install next
