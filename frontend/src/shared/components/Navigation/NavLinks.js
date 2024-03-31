import React, { useContext }  from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/u1/contacts">MY CONTACTS</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/contacts/new">ADD CONTACT</NavLink>
      </li>
    )}
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    )}
  </ul>
};

export default NavLinks;