import React,{Component} from 'react';
import './style.scss';

class Post extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
         
            
        }
      
    }

  
    


  
    render() {
         let {title, desc} = this.props.currPost;
        return(<div className="post-content">
            
         
            <div className="post-template">
                <h3>Post Content</h3>
                <h1>{title}</h1>
                <p>{desc}</p>
              
            </div>
        </div>);
    }
}

export default Post