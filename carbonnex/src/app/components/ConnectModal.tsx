import React, { useState, useEffect } from "react";
import styles from './styles/ConnectModal.module.css';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request?: (args: { method: string; params?: Array<any> }) => Promise<any>;
      selectedAddress?: string;
    };
  }
}

export const ConnectModal: React.FC<{ setIsModalOpen: (open: boolean) => void; setIsConnected: (connected: boolean) => void; }> = ({ setIsModalOpen, setIsConnected }) => {
  const handleConnect = async () => {
    if (window.ethereum && window.ethereum.request) {
      try {
        // Trigger MetaMask to connect the wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // If the connection is successful
        setIsConnected(true);
        setIsModalOpen(false);

      } catch (error) {
        console.error("MetaMask connection error:", error);
        alert("Failed to connect to MetaMask. Please try again.");
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
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

// Component to handle connection and disconnection in the header
const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setIsConnected(true);  // Assume connected if there is a selected address
    }
  }, []);

  const handleDisconnect = () => {
    setIsConnected(false); // Clear the connected state
    // Optionally, you could clear any other related state or local storage
    alert("Disconnected from MetaMask.");
  };

  return (
    <header>
      <nav>
        {/* Your navigation code here */}
        <div>
          {isConnected ? (
            <button onClick={handleDisconnect}>Disconnect</button>
          ) : (
            <button onClick={() => setIsModalOpen(true)}>Connect</button>
          )}
        </div>
      </nav>

      {isModalOpen && (
        <ConnectModal
          setIsModalOpen={setIsModalOpen}
          setIsConnected={setIsConnected}
        />
      )}
    </header>
  );
};

export default Header;
