import React,{Component} from 'react';
import './style.scss';

class PostDisplay extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
         
            
        }
        this.createPosts = this.createPosts.bind(this)
        this.currentSettings = this.currentSetting.bind(this)
    }

    currentSetting = () => {
        let currPath = this.props.location.pathname
        return currPath.substr(1)
    }
    createPosts = () => {
       let post = { id: 0,  type: "Job Posting", title: "Home Page Testing", desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. " }
       let Accountpost = { id: 0,  type: "Job Posting", title: "Account Page Posting", desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. " }
       let posts = [];    
       let postData = []
        console.log(this.currentSetting())

       if(this.currentSetting() === "account") {
            //On Account Page
            postData.push(Accountpost)
       } else {
            //On Home Page
            postData.push(post)
       }
      
       //Add a check to see if the user has posted anything
      
       if(postData.length > 0) {
           postData.map( (data, index,) => {
            posts.push(this.postContent(data, index))
           }) 
       }
     
       return posts;
    }
    

    postContent = (data, idx) => {
        
       let post = <div key={idx} className="post">
        <h4>{data.type}</h4>
        <h3>{data.title}</h3>
        <p>{data.desc}</p>
        <div className="buttom-container">
            <button type='submit' className="input-btn">
                <h4>More Information</h4>  
                <span className="button-bar"></span>  
            </button>
        </div>
        </div>;

        return post; 
    }

  
    render() {
        return(<div className="home-container">
            
            <div className="page-heading">
                <h1>Welcome To Toolbox</h1>
                <h2>Your one stop location for <br/> 
                skilled workers and opportunities </h2>
            </div> 
            {/* Make this a class */}
            <div className="post-template">
                <div className="post-popup">
                    {/* This has to be moved becasue it will take up the entire home page */}
                </div>
                <div className="post-board">


                {this.createPosts()}   
                   

                </div>
            </div>
        </div>);
    }
}

export default PostDisplay