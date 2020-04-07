import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";


import "./assets/fonts/fonts.scss";
import "./assets/stylesheets/_reset.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import Createpost from "./components/Createpost";
import UserProfile from "./components/Profile/UserProfile";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import EditAccount from "./components/profile-forms/EditAccount";
import PostDisplay from "./components/PostDisplay";
import UserPostDisplay from "./components/PostDisplay/UserPosts";
// import Friends from "./components/Friends/index";

import Friend from "./components/Profile/Profile";
import Friends from "./components/Friends/Profiles";
import ContactList from "./components/Friends/ContactList";
import Notification from "./components/Notification";

import Messenger from "./components/Mailbox/Messenger";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PostForm from "./components/PostDisplay/PostForm/PostForm";
import AddPortfolio from "./components/profile-forms/AddPortfolio";
import FriendPortfolio from "./components/Portfolio/FriendPortfolio";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [mobileMenu, toggleMenu] = useState(false);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router >
        
        <Fragment>
          <div id="toolbox-app">
            <div id="subclass-container">
              <Route render={({location})=> (

            
              <TransitionGroup>
                <CSSTransition
                  timeout={{  
                  
                    enter: 1000,
                    exit: 0,
                  }}
                
                 
                  delay={1000}
                  key={location.key}
                  classNames="fade"
               
                >
                  <Switch location={location}>
                    <Route exact path="/" component={PostDisplay} />
                    <PrivateRoute exact path="/dashboard" component={PostDisplay} />
                    <Route exact path="/account" component={UserPostDisplay} />
                    <PrivateRoute exact path="/profile" component={UserProfile} />
                    <PrivateRoute exact path="/friends" component={Friends} />
                    <PrivateRoute exact path="/friend/:id" component={Friend} />
                    <PrivateRoute exact path="/contacts" component={ContactList} />
                    <PrivateRoute exact path="/notifications" component={Notification} />
                    <PrivateRoute exact path="/mailbox" component={Messenger} />
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
                    <PrivateRoute
                      exact
                      path="/edit-account"
                      component={EditAccount}
                    />
                    <PrivateRoute
                      exact
                      path="/portfolio"
                      component={AddPortfolio}
                    />
                  </Switch>
                  </CSSTransition>
                </TransitionGroup>
                  )} />
              <PrivateRoute exact path="/account" component={PostForm} />
            </div>
            <div id={`dash-container`} className={ ` dash-wrapper ${mobileMenu}`}>
              <Dashboard mobileMenu={mobileMenu}/>
            </div>
          </div>
            <div className={`mobile-menu ${mobileMenu}`}>
              <Link to={'/'} className="mobile-home-btn">
                <h1>ToolBox</h1>
              </Link>
              <div className="toggle-menu" onClick={() => toggleMenu(!mobileMenu)}>
                
                <div className="close-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="33.991" viewBox="0 0 34 33.991">
                    <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close" d="M32.314,28.284,44.457,16.141a2.845,2.845,0,0,0-4.024-4.024L28.29,24.26,16.146,12.117a2.845,2.845,0,1,0-4.024,4.024L24.266,28.284,12.122,40.428a2.845,2.845,0,1,0,4.024,4.024L28.29,32.308,40.433,44.452a2.845,2.845,0,1,0,4.024-4.024Z" transform="translate(-11.285 -11.289)"/>
                  </svg>
                </div>

                <div className="open-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18">
                    <path id="Icon_ionic-md-menu" data-name="Icon ionic-md-menu" d="M4.5,27h27V24H4.5Zm0-7.5h27v-3H4.5ZM4.5,9v3h27V9Z" transform="translate(-4.5 -9)"/>
                  </svg>
                </div>

              </div>
           </div> 
        </Fragment>
        </Router>
    </Provider>
  );
};

export default App;
