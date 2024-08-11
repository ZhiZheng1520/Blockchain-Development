import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';
import WelcomeSection from '../../components/WelcomeSection';

const loan: React.FC = () => {
  const ctaText = "Check this out";
  const imageSrc = "/bitcoin.png"; // Ensure this path is correct and the image exists in the public folder
  const title = "Welcome to the Loan Page";
  const description = "We only loan CarbonNex (CNX) with secure collateral. Below are the details.";

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
          <h2 className="text-3xl font-bold text-center mb-4">What is a Loan?</h2>
          <p className="text-center max-w-screen-md mx-auto">We only loan CarbonNex (CNX) with secure collateral. Please read the terms and conditions carefully before applying for a loan.</p>
        </section>
        <section className="py-8 px-4 bg-gray-800">
          <h2 className="text-3xl font-bold text-center mb-4">What to Do?</h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-screen-lg mx-auto">
            <p className="text-center">If you wish to loan, please read the Terms and Conditions (T&Cs) provided here.</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full">Read T&C</button>
          </div>
        </section>
        <section className="py-8 px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Loan Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="mb-4"><strong>1 CNX</strong> → $1000 (Wallet)</p>
              <p className="text-red-500">Make sure to read the T&Cs before applying for a loan.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex justify-between items-center">
              <div>
                <p className="mb-2"><strong>Total Loan Amount</strong></p>
                <p className="text-2xl font-bold">$5000</p>
              </div>
              <div>
                <p className="text-red-500">Note that you can only borrow 1 CNX at once & loan again after clearing your debts.</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full">Borrow Now</button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8 px-4 bg-gray-800">
          <h2 className="text-3xl font-bold text-center mb-4">All Loans</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg">
              <thead className="bg-gray-600">
                <tr>
                  <th className="py-2 px-4 text-left">Loan ID</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Collateral</th>
                  <th className="py-2 px-4 text-left">Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-600">
                  <td className="py-2 px-4">39202003</td>
                  <td className="py-2 px-4">March 20, 2022</td>
                  <td className="py-2 px-4">$5000</td>
                  <td className="py-2 px-4">CNX</td>
                  <td className="py-2 px-4">
                    <button className="bg-green-500 text-white py-2 px-4 rounded-full">Pay Now</button>
                  </td>
                </tr>
                {/* Add more loan entries as needed */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default loan;
