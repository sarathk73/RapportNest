import React from 'react';

import UsersList from '../components/UsersList';
//import sarathImage from '../../sarath.jpeg'; // This path should correctly point to src/sarath.jpeg

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Sarath K',
      image:'https://i.ibb.co/3yK7hXt/Whats-App-Image-2024-03-28-at-12-08-34-PM.jpg',
      contacts: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;