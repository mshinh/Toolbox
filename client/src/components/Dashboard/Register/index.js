import React,{Component} from 'react';
import './style.scss';
import {signup} from '../../../actions/auth';

// import {Redirect} from 'react-router-dom';


//Need to import API, example below
//import API from '../../../../../API'
import accountConstructor from '../accountConstructor.js';


class Register extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          fname: "",
          lname: "",
          email: "",
          password:"",          
          error: "",
          open: false,
          redirectToReferer: false

            
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

      const {fname,lname,email,password} = this.state;

      const user = {
        fname,
        lname,
        email,
        password
      };

       //console.log(user);
      signup(user)
      .then(data => {

        if(data.error) this.setState({error: data.error})
          else { this.setState({
            fname: "",
            lname: "",
            email: "",
            password:"",            
            error: "",
            open: true

          });

          // //authenticate the user
          // this.authenticate(data,() => {
          //   this.setState({redirectToReferer: true})
          //  });

          
          // Calls parent method to change dashboard apppearnce, not sure if best way
          //  this.props.logger();
        }

      });      

      

    };

      
  
    // renderResponse = (res) => {
    // }

  
    render() {
        const {fname,lname,email,password,error,open} = this.state;
        return(<div>
            <form className="addBarForm" autoComplete="off" >
            <div className="form-wrapper">
              <div className="form-row">
                  <fieldset className="form-column" id='meta-form'>
                  <h2 className="input-heading">Register</h2>

                  <div className="alert alert-danger" style={{display: error ? "": "none"}}>{error}</div>

                  <div className="alert alert-info" style={{display: open ? "": "none"}}>
                     New account is succesfully created. Please Sign In.
                  </div>
                
                  <div className="input-row">
                    <div className="input-wrapper">
                      <label htmlFor="fname">First Name</label>
                      <input name="fname" type="text" id="fname" placeholder="John" onChange={this.onChange}  />
                    </div>
                  </div>
                  
                  <div className="input-row">
                    <div className="input-wrapper">
                        <label htmlFor="lname">Last Name</label>
                        <input name="lname" type="text" id="lname" placeholder="Smith" onChange={this.onChange}  />
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="input-wrapper">
                      <label htmlFor="email">Email Name</label>
                      <input name="email" type="email" id="email" placeholder="hello@toolbox.com" onChange={this.onChange}  />
                    </div>
                  </div>
                  
                  <div className="input-row">
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" id="password" placeholder="" onChange={this.onChange}  />
                    </div>
                  </div>

                  
                  </fieldset>
                 
                </div>
                <button type='submit' className="input-btn" onClick={this.onSubmit}>
                    <h4>Register</h4>  
                    <span className="button-bar"></span>  
                  </button>
              </div>
            </form>
        </div>);
    }
}

export default Register