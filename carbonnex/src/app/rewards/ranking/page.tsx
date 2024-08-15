'use client';

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import WelcomeSection from '../../components/WelcomeSection';

const RankCard = ({ rank, name, points, imageSrc, prize }) => (
  <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg text-center">
    <img src={imageSrc} alt={`${name} avatar`} className="w-24 h-24 rounded-full mb-4" />
    <h3 className="text-lg font-bold text-white">{name}</h3>
    <p className="text-sm text-gray-400">Earn {points} points</p>
    <p className="text-blue-500 text-xl">{prize} Prize</p>
  </div>
);

const OtherRankingsHeader = () => (
  <div className="flex items-center justify-between bg-gray-900 p-3.5 mb-5 rounded-lg shadow text-gray-400">
    <div className="flex items-center">
      <span className="text-xl text-center w-10">Place</span>
      <span className="text-xl ml-32">Username</span>
    </div>
    <div className="flex items-center">
      <span className="text-xl mr-52">Points</span>
      <span className="text-xl">Prize</span>
    </div>
  </div>
);

const OtherRankingsRow = ({ place, username, points, prize }) => (
  <div className="flex items-center justify-between bg-gray-900 p-3.5 rounded-lg mb-5 shadow">
    <div className="flex items-center">
      <span className="text-xl text-gray-400 w-10 text-center">{place}</span>
      <span className="text-xl text-white ml-32">{username}</span>
    </div>
    <div className="flex items-center">
      <span className="text-xl text-white mr-56">{points}</span>
      <span className="text-xl text-blue-500">{prize}</span>
    </div>
  </div>
);

const Rank: React.FC = () => {
  const [activeTab, setActiveTab] = useState('seller'); // Default to seller tab
  const ctaText = "Check this out";
  const imageSrc = "/rewards.png"; // Ensure this path is correct and the image exists in the public folder
  const title = "Welcome to the Ranking Page";
  const description = "Congratulations..you have been awarded for....";

  // Example data, replace with actual data
  const sellerRanks = [
    { rank: 1, name: "Seller 1", points: 1500, imageSrc: "/hacker.png", prize: "10,000" },
    { rank: 2, name: "Seller 2", points: 500, imageSrc: "/panda.png", prize: "5,000" },
    { rank: 3, name: "Seller 3", points: 250, imageSrc: "/cat.png", prize: "2,500" },
  ];

  const buyerRanks = [
    { rank: 1, name: "Buyer 1", points: 2000, imageSrc: "/hacker.png", prize: "15,000" },
    { rank: 2, name: "Buyer 2", points: 1200, imageSrc: "/panda.png", prize: "7,000" },
    { rank: 3, name: "Buyer 3", points: 800, imageSrc: "/cat.png", prize: "4,000" },
  ];

  const otherRankings = [
    { place: 4, username: "Tzz", points: 156, prize: "750" },
    { place: 5, username: "Lsh", points: 156, prize: "750" },
    { place: 6, username: "Hacker", points: 156, prize: "750" },
    // Add more rankings as needed
  ];

  const ranks = activeTab === 'seller' ? sellerRanks : buyerRanks;

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Header />
      <main className="flex-grow">
        <WelcomeSection
          title={title}
          description={description}
          ctaText={ctaText}
          imageSrc={imageSrc}
        />
        <section className="py-0">
          <h2 className="text-4xl text-center text-white mb-6">Ranking Rewards</h2>
          <div className="flex justify-center">
            <button
              className={`px-4 py-2 text-lg font-bold rounded-l-lg ${activeTab === 'seller' ? 'bg-blue-700 text-white' : 'bg-gray-400 text-white'}`}
              onClick={() => setActiveTab('seller')}
            >
              Seller
            </button>
            <button
              className={`px-4 py-2 text-lg font-bold rounded-r-lg ${activeTab === 'buyer' ? 'bg-blue-700 text-white' : 'bg-gray-400 text-white'}`}
              onClick={() => setActiveTab('buyer')}
            >
              Buyer
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center m-24 mb-8 mt-10">
            {ranks.map(({ rank, name, points, imageSrc, prize }) => (
              <RankCard
                key={rank}
                rank={rank}
                name={name}
                points={points}
                imageSrc={imageSrc}
                prize={prize}
              />
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-4xl text-white mb-4 ml-24 mt-4">Other Rankings</h3>
            <div className="bg-gray-800 rounded-lg p-4 m-24 mt-8 shadow-lg">
              <OtherRankingsHeader />
              {otherRankings.map(({ place, username, points, prize }) => (
                <OtherRankingsRow
                  key={place}
                  place={place}
                  username={username}
                  points={points}
                  prize={prize}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Rank;
