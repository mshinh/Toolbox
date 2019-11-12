import React, { Fragment, Component } from "react";
import AppNavbar from "./components/AppNavbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/fonts/fonts.scss";
import "./assets/stylesheets/_reset.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Register from "./components/Dashboard/Register";
import Login from "./components/Dashboard/Login";
import Createpost from "./components/Createpost";
import Profile from "./components/Profile";
import UserDash from "./components/Dashboard/UserDash";
import Alert from "./components/Layout/Alert";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <div id="toolbox-app">
          <Alert />
          <div id="subclass-container">
            <Route exact path="/" component={Home} />
          </div>
          <div id="dash-container">
            <Dashboard />
          </div>
        </div>
      </Fragment>
    </Router>
  </Provider>
);

// class App extends Component {
//   render()
//   {
//     return (

//       <div id="toolbox-app">

//       <Router>

//         <div id="subclass-container" >

//             {/* <Route path={"/home"} render={(props)=><Admin changeDash={this.changeDash} {...props}  />}    />
//             <Route path={"/contact"} component={Contact} />
//             <Route path={"/login"} component={Login} exact />
//             <Route path={"/search"} exact  render={(props) => <Search changeDash={this.changeDash} {...props}/>}  /> */}
//             <Route path={"/"} exact  render={(props) => <Home   />}  />
//             <Route path={"/account"} exact render={(props)=> <Createpost />} />
//             <Route path={"/profile/:userId"} exact render={(props)=> <Profile />} />
//             {/* Add Route protection for non logged in users */}

//         </div>
//         <div id="dash-container">

//           {/* <Route path={"/user/:userId"} exact render={(props)=> <UserDash />} />    */}

//           <Dashboard />

//         </div>
//       </Router>

//       </div>
//     );
//   }

// }

export default App;
