import React from 'react';

import UsersList from '../components/UsersList';
import sarathImage from '../../sarath.jpeg'; // This path should correctly point to src/sarath.jpeg

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Sarath K',
      image:sarathImage,
      contacts: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;