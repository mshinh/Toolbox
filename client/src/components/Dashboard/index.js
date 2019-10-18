import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

import Login from './Login';
import Register from './Register';
import Search from './Search';
import UserDash from './UserDash';
import Nav from './Nav';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        // This has to be changed in order to login
        this.state = {

            isLoggedIn: true
            
        }
        this.logger = this.logger.bind(this)
    }

  
    logger = () => {
        
        this.setState({isLoggedIn: !this.state.isLoggedIn})
    }

    
  
    render() {
        return(<div>
            
                <Link className="header dash-item" to={`/`}>
                    <h1>ToolBox</h1>
                    <h3>Home</h3>
                </Link>
            
            <Search />

            {/*  */}
            {this.state.isLoggedIn ? <UserDash logger={this.logger} /> : <Register logger={this.logger} /> }
            {this.state.isLoggedIn ? <Nav logger={this.logger}/>  :  <Login logger={this.logger} />}
        
        </div>);
    }
}

export default Dashboard