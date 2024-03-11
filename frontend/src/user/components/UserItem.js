import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';

import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <Card>
            <Link to={`/${props.id}/contacts`}>
                <div className="user-item__image">
                <Avatar image={props.image} alt={props.name} />
                </div>
                <div className="user-item__info">
                <h2>{props.name}</h2>
                <h3>
                    {props.contactCount} {props.contactCount === 1 ? 'Contact' : 'Contacts'}
                </h3>
                </div>
            </Link>
        </Card>
      </div>
    </li>
  );
};

export default UserItem;