import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewContact from './contacts/pages/NewContact';
import UserContacts from './contacts/pages/UserContact';
import UpdateContact from './contacts/pages/UpdateContact'
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <main>
        <MainNavigation />
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/contacts" exact>
            <UserContacts />
          </Route>
          <Route path="/contacts/new" exact>
            <NewContact />
          </Route>
          <Route path="/contacts/:contactId">
            <UpdateContact />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;