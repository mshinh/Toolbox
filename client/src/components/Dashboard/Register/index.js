import React,{Component} from 'react';
import './style.scss';


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
          confirmPassword: "",
          error: "",
          open: false

            
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange = (e) => {
        this.setState({error:""});
        this.setState({open:false});
        this.setState({[e.target.name]: e.target.value});
    }
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
      this.signup(user)
      .then(data => {

        if(data.error) this.setState({error: data.error})
          else { this.setState({
            fname: "",
            lname: "",
            email: "",
            password:"",
            confirmPassword: "",
            error: "",
            open: true

          });
          // Calls parent method to change dashboard apppearnce, not sure if best way
           this.props.logger();
        }

      });
      

      // const newAccount = accountConstructor(
      //   this.state.fname,
      //   this.state.lname,
      //   this.state.email,
      //   this.state.password,
      //   this.state.confirmPassword,
      // )
     
      // API.addAccount(newAccount).then(res => {
      //   this.renderResponse('success')
      //   this.resetState()

      // })
      // .catch(err => {
      //   this.renderResponse('fail')
      // })

    };

    signup = (user) => {
      return fetch("http://localhost:8000/signup",{
        method: "POST",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(response => {
        return response.json()
      })
      .catch(err => console.log(err));
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

                  <div className="input-row">
                    <div className="input-wrapper">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input name="confirmPassword" type="text" id="confirmPassword" placeholder="" onChange={this.onChange}  />
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