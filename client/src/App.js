import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render()
  {
    return (
      <div className="App">
        <AppNavbar/>
        <Home/>
        <h1>Welcome to ToolBox</h1>
        <ShoppingList/>
      </div>
    );    
  }
  
}

export default App;
