import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/fonts/fonts.scss";
import "./assets/stylesheets/_reset.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import Createpost from "./components/Createpost";
import Profile from "./components/Profile/UserProfile";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div id="toolbox-app">
            <div id="subclass-container">
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/dashboard" component={Home} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
            </div>
            <div id="dash-container">
              <Dashboard />
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
