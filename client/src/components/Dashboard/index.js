import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

import Login from './Login';
import Register from './Register';
import Search from './Search'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
         
            
        }
    }

  

  
    render() {
        return(<div>
            
                <Link className="header" to={`/`}>Home</Link>
            
            <Search />

            <Register />
            <Login />
        </div>);
    }
}

export default Dashboard