import React from 'react';

const ProfileSection = ({ title, description, imageSrc, userData }) => {
  console.log("Rendering ProfileSection with userData:", userData); // Debugging line

  return (
    <div>
      <h1>{title}</h1>
      <p className="mb-4">{description}</p>
      <div className="border p-4 mb-4 rounded shadow">
        {userData ? (
          <>
            <h2 className="text-xl font-bold">{userData.username || 'N/A'}</h2>
            <p><strong>Address:</strong> {userData.address || 'N/A'}</p>
            <p><strong>ID Number:</strong> {userData.id_number || 'N/A'}</p>
            <p><strong>Phone Number:</strong> {userData.phone_number || 'N/A'}</p>
            <p><strong>Wallet Amount (ETH):</strong> {userData["wallet_amount(ETH)"] ?? 'N/A'}</p>
            <p><strong>Wallet Amount (CNX):</strong> {userData["wallet_amount(CNX)"] ?? 'N/A'}</p>
            <p><strong>Verification:</strong> {'********'}</p> {/* Masked Verification */}
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <img src={imageSrc} alt="User profile" />
    </div>
  );
};

export default ProfileSection;
