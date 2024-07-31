import React from 'react';
import { ToastContainer } from 'react-toastify';
import { print } from "@/utils/toast";
import Header from './components/Header';
import { Footer } from './components/Footer';
import WelcomeSection from './components/WelcomeSection';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">

          <h1>This is Rewards Page</h1>
          <p>Congratulations..you have been awarded for....</p>
          ctaText="Check this out"
          imageSrc="rewards.png"

      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;