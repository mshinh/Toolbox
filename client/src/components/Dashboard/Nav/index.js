import React,{Component} from 'react';
import './style.scss';

class Nav extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
           
        }
      
    }

 
  
    render() {
        return(<div className="nav-container">
           {/* <div className="nav-row">
                <div className="nav-item small">Messages</div> <div className="nav-item small">Friends</div>
           </div>
           <div className="nav-row">
                <div className="nav-item large">Profile</div> 
           </div> */}
           <div className="nav-row">
                <div className="nav-item small" onClick={this.props.logger}><h3>logout</h3></div> 
                {/* <div className="nav-item small">preferences</div> */}
           </div>
        </div>);
    }
}

export default Nav