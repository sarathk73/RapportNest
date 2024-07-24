import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/contacts`}>
          <div className="user-item__image">
            <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.firstName + ' ' + props.lastName} />
          </div>
          <div className="user-item__info">
            <h2>{props.firstName + ' ' + props.lastName}</h2>
            <h3>
              {props.contactCount} {props.contactCount === 1 ? 'Contact' : 'Contacts'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
