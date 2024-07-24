import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaList, FaPlus, FaSearch, FaTag, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/" exact className="nav-link" activeClassName="active">
            <FaUsers className="nav-icon" />
            People
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/contacts`} className="nav-link" activeClassName="active">
            <FaList className="nav-icon" />
            My List
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/contacts/new" className="nav-link" activeClassName="active">
            <FaPlus className="nav-icon" />
            New
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/contacts/search" className="nav-link" activeClassName="active">
            <FaSearch className="nav-icon" />
            Find
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/contacts/filter" className="nav-link" activeClassName="active">
            <FaTag className="nav-icon" />
            Tag Filter
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" className="nav-link" activeClassName="active">
            <FaSignInAlt className="nav-icon" />
            Authenticate
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout} className="nav-button">
            <FaSignOutAlt className="nav-icon" />
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
