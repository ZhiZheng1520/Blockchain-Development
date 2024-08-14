import React, { useState } from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { username: string; phone: string; idNumber: string; kycNumber: string }) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [kycNumber, setKycNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if KYC Verification No is "user_verified"
    if (kycNumber.trim() !== "user_verified") {
      alert("KYC verification incorrect, please contact Admin.");
      return;
    }

    onSubmit({ username, phone, idNumber, kycNumber });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Welcome to CarbonNex</h2>
        <p className="mb-4 text-black">Please register for first time user to continue.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Phone Number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Identification No:</label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">KYC Verification No:</label>
            <input
              type="text"
              value={kycNumber}
              onChange={(e) => setKycNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded">Submit</button>
            <button type="button" className="ml-2 bg-red-500 text-black px-4 py-2 rounded" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
