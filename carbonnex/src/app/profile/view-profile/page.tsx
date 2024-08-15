"use client"; // Mark the component as a client component

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import ProfileSection from '../../components/ProfileSection';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const imageSrc = "/user.png";
  const title = "Profile Page";
  const description = "CarbonNex is the best.";

  const checkAddressMatch = async (walletAddress: string) => {
    try {
      console.log("Checking address match for:", walletAddress); // Debugging line

      const response = await fetch(`/api/get-users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status); // Debugging line

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched user data:", data); // Debugging line

        // Find the user matching the provided wallet address
        const user = data.find((user) => user.address.toLowerCase() === walletAddress.toLowerCase());

        if (user) {
          console.log("Matched user:", user); // Debugging line
          setUserData(user);
        } else {
          console.error('No user found with the provided wallet address');
          toast.error('No user found with the provided wallet address');
        }
      } else {
        console.error('Failed to fetch user data:', response.statusText);
        toast.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error during fetch:', error); // Debugging line
      toast.error('An error occurred while fetching user data');
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      console.log("Wallet Address:", window.ethereum.selectedAddress); // Debugging line
      setIsWalletConnected(true);
      checkAddressMatch(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ProfileSection
          title={title}
          description={description}
          imageSrc={imageSrc}
          userData={userData}
        />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Profile;
