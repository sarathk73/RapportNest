import React from 'react';

import { useParams } from 'react-router-dom';
import ContactList from '../components/ContactList';
//import sarathImage from '../../sarath.jpeg'; // This path should correctly point to src/sarath.jpeg

const DUMMY_CONTACTS = [
  {
    id: 'p1',
    title: 'Sarath K',
    description: 'Upcoming Associate Engineer !',
    imageUrl: 'https://i.ibb.co/dQ8HFSr/sarath.jpg',
    phone: '7306162306',
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Akash  TK',
    description: 'Upcoming Software Engineer !',
    imageUrl: 'https://i.ibb.co/G3fDjLx/akash.png',
    phone: '88911 01357',
    creator: 'u1'
  },
  {
    id: 'p3',
    title: 'Duyoof MP',
    description: 'Upcoming Software Engineer !',
    imageUrl: 'https://i.ibb.co/Ht6xdwd/doop.png',
    phone: '95620 22595',
    creator: 'u1'
  }

];

const UserContacts = () => {

  const userId = useParams().userId;
  const loadedContacts = DUMMY_CONTACTS.filter(contact => contact.creator === userId);
  return <ContactList items={loadedContacts} />;
};

export default UserContacts;