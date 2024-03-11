import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewContact from './contacts/pages/NewContact';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/contacts/new" exact>
          <NewContact />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;