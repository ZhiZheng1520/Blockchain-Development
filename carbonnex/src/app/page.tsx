"use client"; // Add this line at the very top

import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { Footer } from './components/Footer';
import WelcomeSection from './components/WelcomeSection';
import { ConnectModal } from './components/ConnectModal';
import RegistrationModal from './components/RegistrationModal';

const App: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressMatch, setIsAddressMatch] = useState<boolean | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    // Check if the wallet is already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
      setIsWalletConnected(true);
      checkAddressMatch(window.ethereum.selectedAddress);
    }
  }, []);

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
        const dbAddress = data[0]?.address.toLowerCase().trim();

        if (walletAddress.toLowerCase().trim() === dbAddress) {
          setIsAddressMatch(true);
          setIsRegistrationOpen(false);  // Don't open the registration modal
        } else {
          setIsAddressMatch(false);
          setIsRegistrationOpen(true);  // Open the registration modal
        }
      } else {
        console.error('Failed to fetch address from the database');
        setIsAddressMatch(false);
        setIsRegistrationOpen(true);  // Open the registration modal
      }
    } catch (error) {
      console.error('An error occurred while checking the address match', error);
      setIsAddressMatch(false);
      setIsRegistrationOpen(true);  // Open the registration modal
    }
  };

  const handleMarketplaceClick = () => {
    if (!isWalletConnected) {
      setIsModalOpen(true); // Open the modal if the wallet is not connected
    } else if (isAddressMatch) {
      // Navigate to marketplace if the wallet is connected and addresses match
      window.location.href = "/marketplace";
    } else {
      // Handle the case where the addresses do not match
      alert("The connected wallet address does not match our records.");
    }
  };

  const handleRegistrationSubmit = async (formData: { username: string; email: string }) => {
    try {
      const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful!');
        setIsRegistrationOpen(false); // Close the registration modal
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('An error occurred while updating the user', error);
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

      {/* Render the Registration Modal only if the wallet address does not match */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  );
};

export default App;
