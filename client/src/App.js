import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar'


import { BrowserRouter as Router, Route } from "react-router-dom";

import './assets/fonts/fonts.scss';
import './assets/stylesheets/_reset.scss';

import PostDisplay from './components/PostDisplay'
import Dashboard from './components/Dashboard'
import Register from './components/Dashboard/Register'
import Login from './components/Dashboard/Login'
import Createpost from './components/Createpost'
import Profile from './components/Profile'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';

class App extends Component {
  render()
  {
    return (

      <div id="toolbox-app">
        
       
      <Router>
     
        <div id="subclass-container" >

          
            {/* <Route path={"/home"} render={(props)=><Admin changeDash={this.changeDash} {...props}  />}    />
            <Route path={"/contact"} component={Contact} />
            <Route path={"/login"} component={Login} exact />
            <Route path={"/search"} exact  render={(props) => <Search changeDash={this.changeDash} {...props}/>}  /> */}
            <Route path={"/(|account)"}  render={(props) => <PostDisplay  {...props} />}  />
            <Route path={"/account"} exact render={(props)=> <Createpost />} />
            <Route path={"/profile"} exact render={(props)=> <Profile />} />
            {/* Add Route protection for non logged in users */}
            


        </div>
        <div id="dash-container"> 
            
          <Dashboard />
          

        </div>
      </Router>
      
      </div>
    );    
  }
  
}

export default App;
