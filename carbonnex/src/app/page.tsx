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
        <WelcomeSection
          title="Welcome to CarbonNex"
          description="A Decentralised Carbon Credit Exchange Platform"
          ctaText="Get Started"
          imageSrc="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a"
        />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
