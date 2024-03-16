import React from 'react';

import Card from '../../shared/components/UIElements/Card';
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
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className="contact-item__actions">
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default ContactItem;