import React,{Component} from 'react';
import './style.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
         
            
        }
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
                    <div className="post">
                        <h4>Job Posting</h4>
                        <h3>This Is The Title</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. 
                        </p>
                        <div className="buttom-container">
                            <button type='submit' className="input-btn">
                                <h4>More Information</h4>  
                                <span className="button-bar"></span>  
                            </button>
                        </div>
                    </div>

                    <div className="post">
                        <h4>Job Posting</h4>
                        <h3>This Is The Title</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. 
                        </p>
                        <div className="buttom-container">
                            <button type='submit' className="input-btn">
                                <h4>More Information</h4>  
                                <span className="button-bar"></span>  
                            </button>
                        </div>
                    </div>

                    <div className="post">
                        <h4>Job Posting</h4>
                        <h3>This Is The Title</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. 
                        </p>
                        <div className="buttom-container">
                            <button type='submit' className="input-btn">
                                <h4>More Information</h4>  
                                <span className="button-bar"></span>  
                            </button>
                        </div>
                    </div>
                    <div className="post">
                        <h4>Job Posting</h4>
                        <h3>This Is The Title</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. 
                        </p>
                        <div className="buttom-container">
                            <button type='submit' className="input-btn">
                                <h4>More Information</h4>  
                                <span className="button-bar"></span>  
                            </button>
                        </div>
                    </div>
                    <div className="post">
                        <h4>Job Posting</h4>
                        <h3>This Is The Title</h3>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt viverra nulla ut mattis. Quisque tincidunt pretium lorem at porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tempus maximus. Suspendisse tincidunt consectetur tortor vitae aliquam. Suspendisse auctor tortor ut magna iaculis, id venenatis mi facilisis. 
                        </p>
                        <div className="buttom-container">
                            <button type='submit' className="input-btn">
                                <h4>More Information</h4>  
                                <span className="button-bar"></span>  
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Home