import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './ContactItem.css';

const ContactItem = props => {
  return (
    <li className="contact-item">
      <Card className="contact-item__content">
        <div className="contact-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="contact-item__info">
          <h2>{props.title}</h2>
          <h3>{props.phone}</h3>
          <p>{props.description}</p>
        </div>
        <div className="contact-item__actions">
          <Button to={`/places/${props.id}`}>EDIT</Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default ContactItem;