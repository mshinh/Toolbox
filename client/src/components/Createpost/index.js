import React,{Component} from 'react';
import './style.scss';
import {signup} from '../../actions/auth';

// import {Redirect} from 'react-router-dom';


//Need to import API, example below
//import API from '../../../../../API'
//import accountConstructor from '../Dashboard/accountConstructor.js';


class Createpost extends Component {
    constructor(props) {
        super(props);
        
        
        this.state = {
          type: "job",
          title: "",
          location: "",         
          desc: "",
          error: "",
          open: true
    
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange = (e) => {
        this.setState({error:""});
        this.setState({open:false});
        this.setState({[e.target.name]: e.target.value});
    }

    // authenticate (jwt,next) {
    //   if(typeof window !== "undefined"){
    //       localStorage.setItem("jwt",JSON.stringify(jwt));
    //       next();
    //   }

    // } 
    onSubmit = (e) => {
      e.preventDefault();

      //const {fname,lname,email,password} = this.state;

      // const user = {
      //   fname,
      //   lname,
      //   email,
      //   username,
      //   password
      // };

   
     

    };

    
  
    // renderResponse = (res) => {
    // }

  
    render() {
      const {error,open} = this.state;
        return(<div>
            <form className="addBarForm" autoComplete="off" >
            <div className="form-wrapper">
              <div className="form-row">
                  <fieldset className="form-column" id='meta-form'>
                 
                  <h2 className="input-heading">Create A Post</h2>

                  <div className="alert alert-danger" style={{display: error ? "": "none"}}>{error}</div>

                  <div className="alert alert-info" style={{display: open ? "": "none"}}>
                  
                  </div>
                
                  <div className="input-row">
                    <div className="input-wrapper">
                      <label htmlFor="title">Job Title</label>
                      <input name="title" type="text" id="title" placeholder="Weekend Plumbing" onChange={this.onChange}  />
                    </div>
                  </div>
                  
                  <div className="input-row">
                    <div className="input-wrapper">
                      <label htmlFor="location">Location</label>
                      {/* Will have to expand on this more */}
                      <input name="location" type="text" id="location" placeholder="Toronto" onChange={this.onChange}  />
                    </div>
                  </div>

                  
                  <div className="input-row">       
                      <div className="input-wrapper">
                          <label htmlFor="desc">Description</label>
                          
                          <textarea row="10" col="80" name="desc" type="text" id="desc" onChange={this.onChange}  >

                          </textarea>
                      </div>
                  </div>

                

                  
                  </fieldset>
                 
                </div>
                <button type='submit' className="input-btn" onClick={this.onSubmit}>
                    <h4>Submit Post</h4>  
                    <span className="button-bar"></span>  
                  </button>
              </div>
            </form>
        </div>);
    }
}

export default Createpost