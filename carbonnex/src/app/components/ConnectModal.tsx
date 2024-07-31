"use client";

import React from 'react';
import styles from './styles/ConnectModal.module.css';

// Add the type declaration for `window.ethereum` at the top of the file
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request?: (args: { method: string }) => Promise<void>;
    };
  }
}

export const ConnectModal: React.FC<{ setIsModalOpen: (open: boolean) => void; setIsConnected: (connected: boolean) => void; }> = ({ setIsModalOpen, setIsConnected }) => {
  const handleConnect = async () => {
    if (window.ethereum && window.ethereum.request) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setIsModalOpen(false);
      } catch (error) {
        console.error("MetaMask connection error:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.heading}>Connect to MetaMask</h2>
        <p className={styles.text}>Please connect your MetaMask wallet to access this page.</p>
        <button className={styles.button} onClick={handleConnect}>Connect to MetaMask</button>
        <button className={styles.button} onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};
