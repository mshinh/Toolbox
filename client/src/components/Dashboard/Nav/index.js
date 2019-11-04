import React,{Component} from 'react';
import {signout} from '../../../actions/auth'
import './style.scss';

class Nav extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
           
        }
      
    }

    Logout = (e) => {
        if(e){
            e.preventDefault();
        }
        //check if need to catch errors before changing the state of the logger
        signout();        
       
        this.props.logger();          
            
    };
    
    render() {
        return(<div className="nav-container">
           <div className="nav-row">
                <div className="nav-item small">Messages</div> <div className="nav-item small">Friends</div>
           </div>
           <div className="nav-row">
                <div className="nav-item large"><h3>Profile</h3></div> 
           </div> 
           <div className="nav-row">
                <div className="nav-item small" onClick={(e) => this.Logout(e)}>Preferences</div>               
                <div className="nav-item small" onClick={(e) => this.Logout(e)}>Logout</div> 
                {/* <div className="nav-item small">preferences</div> */}
           </div>
        </div>);
    }
}


export default Nav