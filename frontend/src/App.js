import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

// Lazily load components
const Users = lazy(() => import('./user/pages/Users'));
const NewContact = lazy(() => import('./contacts/pages/NewContact'));
const UserContacts = lazy(() => import('./contacts/pages/UserContact'));
const UpdateContact = lazy(() => import('./contacts/pages/UpdateContact'));
const SearchContacts = lazy(() => import('./contacts/pages/SearchContacts'));
const FilteredContacts = lazy(() => import('./contacts/pages/TagFilter'));
const Auth = lazy(() => import('./user/pages/Auth'));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/contacts/search" exact>
          <SearchContacts />
        </Route>
        <Route path="/contacts/filter" exact>
          <FilteredContacts />
        </Route>
        <Route path="/:userId/contacts" exact>
          <UserContacts />
        </Route>
        <Route path="/contacts/new" exact>
          <NewContact />
        </Route>
        <Route path="/contacts/:contactId" exact>
          <UpdateContact />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
