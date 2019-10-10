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
            
                <Link className="header dash-item" to={`/`}>
                    <h1>ToolBox</h1>
                    <h3>Home</h3>
                </Link>
            
            <Search />

            <Register />
            <Login />
        </div>);
    }
}

export default Dashboard