import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import WelcomeSection from '../../components/WelcomeSection';

const staking: React.FC = () => {
  const ctaText = "Start Staking";
  const imageSrc = "/staking.png"; // Ensure this path is correct and the image exists in the public folder
  const title = "Welcome to the Staking Page";
  const description = "Earn rewards from staking your CarbonNex (CNX). Lock your assets and gain passive income.";

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
          <h2 className="text-3xl font-bold text-center mb-4">What is Staking?</h2>
          <p className="text-center max-w-screen-md mx-auto">Staking involves locking up a certain amount of CarbonNex (CNX) tokens in a wallet to support the operations of the blockchain network. In return, you earn rewards.</p>
        </section>
        <section className="py-8 px-4 bg-gray-800">
          <h2 className="text-3xl font-bold text-center mb-4">Staking Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="mb-4"><strong>Validators:</strong> 289</p>
              <p className="mb-4"><strong>Total Value Locked:</strong> 12.8M USD</p>
              <p className="mb-4"><strong>Total Stake:</strong> 3,769,991 CNX</p>
              <p className="mb-4"><strong>CNX Price:</strong> 2.04 USD</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <img src="/staking-example.png" alt="Staking Example" className="w-full h-auto rounded-md" />
            </div>
          </div>
        </section>
        <section className="py-8 px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Staking Calculator</h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-screen-lg mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <label className="block text-sm font-bold mb-2">Staking Amount</label>
                <input type="number" className="bg-gray-800 text-white p-2 rounded-md w-full md:w-64" placeholder="Enter amount in CNX" />
              </div>
              <div className="mb-4 md:mb-0">
                <label className="block text-sm font-bold mb-2">Staking Period (Days)</label>
                <input type="number" className="bg-gray-800 text-white p-2 rounded-md w-full md:w-64" placeholder="Enter staking period" />
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full">Calculate Rewards</button>
            </div>
            <div className="mt-4 text-center">
              <p><strong>Estimated Stake Rewards:</strong></p>
              <p>Daily: <span className="text-green-400">14 CNX ($28.98)</span></p>
              <p>Monthly: <span className="text-green-400">310 CNX ($641.7)</span></p>
              <p>Yearly: <span className="text-green-400">3800 CNX ($7866)</span></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default staking;
