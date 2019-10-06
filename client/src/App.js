import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar'


import { BrowserRouter as Router, Route } from "react-router-dom";

import './assets/fonts/fonts.scss';
import './assets/stylesheets/_reset.scss';

import Home from './components/Home'
import Dashboard from './components/Dashboard'
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
            <Route path={"/"} exact  render={(props) => <Home   />}  />


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
