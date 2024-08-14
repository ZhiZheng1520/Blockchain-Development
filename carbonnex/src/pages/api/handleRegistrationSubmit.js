const handleRegistrationSubmit = async (formData) => {
  try {
    const walletAddress = window.ethereum.selectedAddress; // Get the MetaMask address

    const response = await fetch('/api/add-user', {  // Ensure this path matches your API route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, address: walletAddress }),
    });

    if (response.ok) {
      alert('Registration successful!');
      setIsRegistrationOpen(false); // Close the registration modal
    } else {
      console.error('Failed to add user');
    }
  } catch (error) {
    console.error('An error occurred while adding the user', error);
  }
};
