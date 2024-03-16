import React from 'react';

import ContactList from '../components/ContactList';
import sarathImage from '../../sarath.jpeg'; // This path should correctly point to src/sarath.jpeg

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Sarath K',
    description: 'Upcoming SDE !',
    imageUrl: sarathImage,
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

const UserContacts = () => {

  return <ContactList items={DUMMY_PLACES} />;
};

export default UserContacts;