import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import ContactItem from './ContactItem';
import './ContactList.css';

const ContactList = props => {
  if (props.items.length === 0) {
    return (
      <div className="contact-list center">
        <Card>
          <h2>No contacts found. Maybe create one?</h2>
          <button>Share Contact</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="contact-list">
      {props.items.map(contact => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          image={contact.imageUrl}
          title={contact.title}
          description={contact.description}
          phone={contact.phone}
          creatorId={contact.creator}
        />
      ))}
    </ul>
  );
};

export default ContactList;