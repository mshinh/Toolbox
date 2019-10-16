import React,{Component} from 'react';
import './style.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
         
            
        }
    }

  

  
    render() {
        return(<div>
            <h1 className="test">Welcome to Toolbox</h1>
            <h2>Your one stop location for <br/> 
            skilled workers and opportunities </h2> 
            {/* Make this a class */}
            <div className="post-template">
                <div className="post-popup">

                </div>
                <div className="post-board">
                    <div ClassName="post">
                        
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Home