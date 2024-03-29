import React from 'react';

import { useParams } from 'react-router-dom';
import ContactList from '../components/ContactList';
import sarathImage from '../../sarath.jpeg'; // This path should correctly point to src/sarath.jpeg

const DUMMY_CONTACTS = [
  {
    id: 'p1',
    title: 'Sarath K',
    description: 'Upcoming Associate Engineer !',
    imageUrl: sarathImage,
    phone: '7306162306',
    creator: 'u1'
  }
];

const UserContacts = () => {

  const userId = useParams().userId;
  const loadedContacts = DUMMY_CONTACTS.filter(contact => contact.creator === userId);
  return <ContactList items={loadedContacts} />;
};

export default UserContacts;