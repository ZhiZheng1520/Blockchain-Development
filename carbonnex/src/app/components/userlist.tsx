"use client";

import React, { useEffect, useState } from 'react';

// Define the WalletUser type based on your database structure
type WalletUser = {
  address: string;
  wallet_amount_eth: string;
  wallet_amount_cnx: string;
  verification: string;
  username: string;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<WalletUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/get-users'); // Replace with your actual API endpoint
        const data: WalletUser[] = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.address}>
            <strong>Username:</strong> {user.username} <br />
            <strong>Address:</strong> {user.address} <br />
            <strong>ETH Balance:</strong> {user.wallet_amount_eth} <br />
            <strong>CNX Balance:</strong> {user.wallet_amount_cnx} <br />
            <strong>Verification:</strong> {user.verification} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
