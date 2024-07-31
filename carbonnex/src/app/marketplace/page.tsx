import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import {Footer} from '../components/Footer';
import WelcomeSection from '../components/WelcomeSection';

const marketplace: React.FC = () => {
  const ctaText = "Check this out";
  const imageSrc = "/rewards.png"; // Ensure this path is correct and the image exists in the public folder
  const title = "Welcome to the Marketplace Page";
  const description = "Congratulations..you have been awarded for....";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <WelcomeSection
          title={title}
          description={description}
          ctaText={ctaText}
          imageSrc={imageSrc}
        />
        <h1>This is the Rewards Page</h1>
        <p>{description}</p>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default marketplace;
