"use client"; // Add this line at the very top

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setIsWalletConnected(true);
      checkAddressMatch(window.ethereum.selectedAddress);
    }
  }, []);

  const checkAddressMatch = async (walletAddress) => {
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

        // Iterate over each user in the response data
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
      const walletAddress = window.ethereum.selectedAddress; // Get the MetaMask address

      const response = await fetch('/api/add-user', {  // Ensure this path matches your API route
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
          setIsConnected={setIsWalletConnected}
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
