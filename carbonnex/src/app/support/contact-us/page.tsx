import React from 'react';
import { ToastContainer } from 'react-toastify';
import { print } from "@/utils/toast";
import Header from './components/Header';
import { Footer } from './components/Footer';
import WelcomeSection from './components/WelcomeSection';

const contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <WelcomeSection
          title="Welcome to CarbonNex"
          description="A Decentralised Carbon Credit Exchange Platform"
          ctaText="Get Started"
          imageSrc="Cute.png"
        />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default contact;
