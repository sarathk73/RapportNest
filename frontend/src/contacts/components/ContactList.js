import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import ContactItem from './ContactItem';
import './ContactList.css';

const ContactList = props => {
  if (props.items.length === 0) {
    return (
      <div className="contact-list center">
        <Card>
          <h2>No contacts found. Maybe create one?</h2>
          <Button to="/contacts/new">Share Contact</Button>
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
          image={contact.image}
          title={contact.title}
          description={contact.description}
          phone={contact.phone}
          creatorId={contact.creator}
          onDelete={props.onDeleteContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;