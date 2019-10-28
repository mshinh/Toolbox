import React,{Component} from 'react';
import './style.scss';
import {isAuthenticated} from '../../../actions/auth';
import userImage from '../../../assets/images/f_trades.jpg';

class UserDash extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
         
            
        }
    }  
  
    render() {
        return(<div className="user-item">
           <div className="user-picture" style ={ { backgroundImage: `url(${userImage})`}}>
                
           </div>
            <div className="user-detail">
            <h3>
                {/* Have to put the user name here */}
                Hello {isAuthenticated().user.fname} !
            </h3>
            </div>
        </div>);
    }
}

export default UserDash