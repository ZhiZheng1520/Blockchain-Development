import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';

const About: React.FC = () => {
  const title = "About Us";
  const description = `
    Our company was founded with a mission to create innovative solutions for modern challenges.
    We believe in leveraging technology to make the world a better place.
    Our team is dedicated to providing the highest quality services to our customers.
    Join us on our journey to make a positive impact in the world.`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow py-10 px-4">
        <section className="bg-gray-800 rounded-lg shadow-lg max-w-screen-xl mx-auto p-8 flex justify-between items-center">
          <div className="flex-1 mr-8">
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <hr className="border-gray-600 mb-6" />
            <p className="text-lg leading-relaxed">
              {description.split('\n').map((line, index) => (
                <span key={index} className="block mb-4">{line}</span>
              ))}
            </p>
          </div>
          <div className="flex-shrink-0">
            <img src="/contact.png" alt="Contact Us" className="rounded-lg shadow-lg w-full max-w-xs" />
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default About;
