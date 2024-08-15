import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import WelcomeSection from '../../components/WelcomeSection';
import { FiHelpCircle } from 'react-icons/fi'; // For the '?' icon

const Contact: React.FC = () => {
  const ctaText = "Get in Touch";
  const imageSrc = "/contact.png";
  const title = "Contact Us";
  const description = "We're here to help! Reach out to us through any of the following contact methods.";

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
        <section className="py-8 px-4 bg-gray-800 rounded-lg shadow-lg max-w-screen-lg mx-auto mt-10 mb-24 relative">
          <h2 className="text-4xl font-bold mb-6 ml-8">Contact Us</h2>
          <hr className="border-gray-600 mb-6" />
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 ml-8 text-lg">
              <p className="mb-4"><strong>Email:</strong></p>
              <p className="mb-4"><strong>Phone:</strong></p>
              <p><strong>Hotline:</strong></p>
            </div>
            <div className="col-span-2 ml-8 text-lg">
              <p className="mb-4">CarbonNex@gmail.com</p>
              <p className="mb-4">+123 456 7890</p>
              <p className="mb-8">+987 654 3210</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <FiHelpCircle size={32} className="text-white" />
            <p className="text-sm text-white">Need Help?</p>
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Contact;
