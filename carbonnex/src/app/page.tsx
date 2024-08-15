"use client";

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { Footer } from './components/Footer';
import WelcomeSection from './components/WelcomeSection';
import ConnectModal from './components/ConnectModal';
import RegistrationModal from './components/RegistrationModal';

const App: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressMatch, setIsAddressMatch] = useState<boolean | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);

  const tokenContractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your token contract address
  const tokenABI = [
    // Add your ERC20 ABI here
    "function balanceOf(address owner) view returns (uint256)",
  ];

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setIsWalletConnected(true);
      checkAddressMatch(window.ethereum.selectedAddress);
      fetchTokenBalance(window.ethereum.selectedAddress); // Fetch token balance on connect
    }
  }, [isWalletConnected]);

  const fetchTokenBalance = async (walletAddress: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenContractAddress, tokenABI, provider);
      const balance = await contract.balanceOf(walletAddress);
      setTokenBalance(ethers.utils.formatUnits(balance, 18)); // Adjust decimals if needed
    } catch (error) {
      console.error('Failed to fetch token balance', error);
    }
  };

  const checkAddressMatch = async (walletAddress: string) => {
    try {
      const response = await fetch(`/api/get-users?address=${walletAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.length === 0) {
          setIsAddressMatch(false);
          setIsRegistrationOpen(true);
          return;
        }

        let matchFound = false;

        data.forEach((user) => {
          const dbAddress = user.address.toLowerCase().trim();
          if (walletAddress.toLowerCase().trim() === dbAddress) {
            matchFound = true;
          }
        });

        if (matchFound) {
          setIsAddressMatch(true);
          setIsRegistrationOpen(false);
        } else {
          setIsAddressMatch(false);
          setIsRegistrationOpen(true);
        }
      } else {
        console.error('Failed to fetch address from the database');
        setIsAddressMatch(false);
        setIsRegistrationOpen(true);
      }
    } catch (error) {
      console.error('An error occurred while checking the address match', error);
      setIsAddressMatch(false);
      setIsRegistrationOpen(true);
    }
  };

  const handleMarketplaceClick = () => {
    if (!isWalletConnected) {
      setIsModalOpen(true);
    } else if (isAddressMatch) {
      window.location.href = "/marketplace";
    } else {
      alert("The connected wallet address does not match our records.");
    }
  };

  const handleRegistrationSubmit = async (formData: { username: string; phone: string; idNumber: string; kycNumber: string }) => {
    try {
      const walletAddress = window.ethereum.selectedAddress;

      const response = await fetch('/api/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, address: walletAddress }),
      });

      if (response.ok) {
        alert('Registration successful!');
        setIsRegistrationOpen(false); // Close the registration modal
        window.location.reload(); // Refresh the window
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('An error occurred while adding the user', error);
    }
  };

  const handleConnectModalClose = (connected: boolean) => {
    setIsModalOpen(false);
    if (connected) {
      setIsWalletConnected(true);
      fetchTokenBalance(window.ethereum.selectedAddress);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMarketplaceClick={handleMarketplaceClick} />

      {isWalletConnected && isAddressMatch !== null && (
        <div className={`p-4 text-center ${isAddressMatch ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {isAddressMatch
            ? 'Your MetaMask address matches with our records.'
            : 'Your MetaMask address does not match our records.'}
        </div>
      )}

      {isWalletConnected && tokenBalance !== null && (
        <div className="p-4 text-center bg-blue-500 text-white">
          Your token balance: {tokenBalance}
        </div>
      )}

      <main className="flex-grow">
        <WelcomeSection
          title="Welcome to CarbonNex"
          description="A Decentralised Carbon Credit Exchange Platform"
          ctaText="Get Started"
          imageSrc="Cute.png"
        />
      </main>
      <Footer />
      <ToastContainer />

      {isModalOpen && !isWalletConnected && (
        <ConnectModal
          setIsModalOpen={setIsModalOpen}
          setIsConnected={handleConnectModalClose}
        />
      )}

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  );
};

export default App;
