'use client';

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import WelcomeSection from '../../components/WelcomeSection';

const Staking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stake');
  const ctaText = activeTab === 'stake' ? "Start Staking" : "Start Unstaking";
  const imageSrc = "/staking.png"; // Ensure this path is correct and the image exists in the public folder
  const title = activeTab === 'stake' ? "Welcome to the Staking Page" : "Welcome to the Unstaking Page";
  const description = activeTab === 'stake'
    ? "Earn rewards from staking your CarbonNex (CNX). Lock your assets and gain passive income."
    : "Withdraw your staked CarbonNex (CNX) securely. Unlock your assets and stop earning rewards.";

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <WelcomeSection
          title={title}
          description={description}
          ctaText={ctaText}
          imageSrc={imageSrc}
        />
        <section className="py-8 px-4">
                  <h2 className="text-4xl font-bold text-center mb-4">What is a Staking?</h2>
                  <p className="text-center max-w-screen-md mx-auto text-xl">Staking is when you lock crypto assets for a set period of time to help support the operation of a blockchain. In return for staking your crypto, you earn more cryptocurrency.</p>
                </section>
        <section className="py-8 px-4 bg-gray-800">
          <h2 className="text-4xl font-bold text-center mb-4">{activeTab === 'stake' ? 'Staking Overview' : 'Unstaking Overview'}</h2>
          <div className="max-w-screen-lg mx-auto mb-8">
            <div className="grid grid-cols-4 gap-4 bg-gray-700 p-6 rounded-lg shadow-lg">
              <div>
                <p className="text-gray-400">Validators</p>
                <p className="font-bold text-xl">289</p>
              </div>
              <div>
                <p className="text-gray-400">Total Value Locked</p>
                <p className="font-bold text-xl">12.8M USD</p>
              </div>
              <div>
                <p className="text-gray-400">Total Stake</p>
                <p className="font-bold text-xl">3,769,991 CNX</p>
              </div>
              <div>
                <p className="text-gray-400">CNX Price</p>
                <p className="font-bold text-xl">2.04 USD</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4">
          <h2 className="text-4xl font-bold text-center mb-2">{activeTab === 'stake' ? 'Staking Calculator' : 'Unstaking Calculator'}</h2>
          <section className="flex justify-center py-8 px-4">
            <button
              className={`px-6 py-2 text-lg font-bold rounded-l-lg ${activeTab === 'stake' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
              onClick={() => setActiveTab('stake')}
            >
              Stake
            </button>
            <button
              className={`px-6 py-2 text-lg font-bold rounded-r-lg ${activeTab === 'unstake' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
              onClick={() => setActiveTab('unstake')}
            >
              Unstake
            </button>
          </section>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-screen-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
              <div>
                <label className="block text-sm font-bold mb-2">{activeTab === 'stake' ? 'Staking Amount' : 'Unstaking Amount'}</label>
                <input type="number" className="bg-gray-800 text-white p-2 rounded-md w-full" placeholder={`Enter amount in CNX`} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">{activeTab === 'stake' ? 'Staking Period (Days)' : 'Unstaking Period (Days)'}</label>
                <input type="number" className="bg-gray-800 text-white p-2 rounded-md w-full" placeholder={`Enter ${activeTab === 'stake' ? 'staking' : 'unstaking'} period`} />
              </div>
            </div>
            <div className="text-center">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full">{activeTab === 'stake' ? 'Calculate Rewards' : 'Calculate Unstaking'}</button>
            </div>
            <div className="mt-6 text-center">
              <p><strong>{activeTab === 'stake' ? 'Estimated Stake Rewards' : 'Estimated Unstake Amount'}:</strong></p>
              <p>{activeTab === 'stake' ? 'Daily: ' : ''}<span className="text-green-400">{activeTab === 'stake' ? '14 CNX (ETH 28.98)' : '3800 CNX (ETH 7866)'}</span></p>
              {activeTab === 'stake' && (
                <>
                  <p>Monthly: <span className="text-green-400">310 CNX (ETH 641.7)</span></p>
                  <p>Yearly: <span className="text-green-400">3800 CNX (ETH 7866)</span></p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Staking;
