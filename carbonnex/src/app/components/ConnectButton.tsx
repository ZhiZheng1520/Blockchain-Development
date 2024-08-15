"use client";

import React, { useState, useEffect } from 'react';
import { useDisconnect } from 'wagmi';

export const ConnectButton: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    // Check if MetaMask is already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);
      setIsConnected(true);
    }
  }, []);

  const handleConnect = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect:', error);
      alert('Failed to connect. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    // Use wagmi's disconnect method to clean up
    disconnect();

    // Clear the address and connection state
    setAddress(null);
    setIsConnected(false);
    alert('Disconnected from MetaMask.');
  };

  return (
    <div>
      {isConnected && address ? (
        <button onClick={handleDisconnect}>
          Disconnect ({address.substring(0, 6)}...{address.substring(address.length - 4)})
        </button>
      ) : (
        <button onClick={handleConnect} disabled={isConnecting}>
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};
