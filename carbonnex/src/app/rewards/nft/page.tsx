import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import WelcomeSection from '../../components/WelcomeSection';

const nft: React.FC = () => {
  const ctaText = "Check this out";
  const imageSrc = "/rewards.png"; // Ensure this path is correct and the image exists in the public folder
  const title = "Welcome to the Rewards Page";
  const description = "Congratulations..you have been awarded for....";

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
        <section className="py-4">
          <h2 className="text-4xl font-bold text-center mb-14">Claim your rewards now!!!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
            {/* NFT Badge Cards */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="/platinum.png" alt="Platinum Badge" className="w-full h-auto mb-4 rounded-md" />
              <h3 className="text-2xl text-center font-semibold mb-2">Platinum Badge</h3>
              <p className="text-gray-400">Use now with referral code DAY888</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="/gold.png" alt="Gold Badge" className="w-full h-auto mb-4 rounded-md" />
              <h3 className="text-2xl text-center font-semibold mb-2">Gold Badge</h3>
              <p className="text-gray-400">Use now with referral code TZZ620</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="/silver.png" alt="Silver Badge" className="w-full h-auto mb-4 rounded-md" />
               <h3 className="text-2xl text-center font-semibold mb-2">Silver Badge</h3>
               <p className="text-gray-400">Use now with referral code LSH326</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="/bronze.png" alt="Bronze Badge" className="w-full h-auto mb-4 rounded-md" />
              <h3 className="text-2xl text-center font-semibold mb-2">Bronze Badge</h3>
              <p className="text-gray-400">Use now with referral code PWH827</p>
            </div>
          </div>
        </section>
        <section className="py-12 bg-gray-800">
          <h2 className="text-3xl font-bold text-center mb-6">How to get your rewards?</h2>
          <div className="max-w-screen-md mx-auto text-gray-400 px-4 text-center text-justify">
             <p className="mb-4"><strong>Step 1:</strong> Spend more on Carbon.</p>
             <p className="mb-4"><strong>Step 2:</strong> Connect your wallet.</p>
             <p className="mb-4"><strong>Step 3:</strong> Check and verify your account.</p>
             <p className="mb-4"><strong>Step 4:</strong> Claim your reward by checking your reward page.</p>
          </div>
        </section>
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-6">How to use your rewards?</h2>
           <div className="max-w-screen-md mx-auto text-gray-400 px-4 text-justify">
              <p className="mb-4"><strong>Step 1:</strong> Go to the rewards section.</p>
              <p className="mb-4"><strong>Step 2:</strong> Copy the referral code.</p>
              <p className="mb-4"><strong>Step 3:</strong> Apply your code to the respective service.</p>
              <p className="mb-4"><strong>Step 4:</strong> Confirm the transaction.</p>
              <p className="mb-4"><strong>Step 5:</strong> Enjoy the benefits of your reward!</p>
           </div>
        </section>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default nft;
