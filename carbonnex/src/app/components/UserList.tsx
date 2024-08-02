"use client";

import React, { useEffect, useState } from 'react';

// Define the User type
type User = {
  id: number;
  name: string;
  number: number;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/get-users');
        const data: User[] = await response.json();
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
          <li key={user.id}>
            {user.name} ({user.number})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
