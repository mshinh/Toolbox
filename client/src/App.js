import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar'
<<<<<<< HEAD
import ShoppingList from './components/ShoppingList'

=======
import Home from './components/Home'
>>>>>>> f6d45bb68b25b933934f89d3d7e30765e8f1b532
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
