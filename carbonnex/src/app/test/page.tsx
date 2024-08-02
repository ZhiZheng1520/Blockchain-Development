// src/app/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { print } from "@/utils/toast";
import Header from './../components/Header';
import { Footer } from './../components/Footer';
import UserList from './../components/UserList';

const App: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState('Checking...');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('/api/check-connection');
        const data = await response.json();
        setConnectionStatus(data.status);
      } catch (error) {
        console.error('Error fetching connection status:', error);
        setConnectionStatus('Disconnected');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="p-4 text-center">
          <strong>Database Connection Status:</strong> {connectionStatus}
        </div>
        <UserList />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
