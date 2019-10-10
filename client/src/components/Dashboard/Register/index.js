import React,{Component} from 'react';
import './style.scss';


//Need to import API, example below
//import API from '../../../../../API'
import accountConstructor from '../accountConstructor.js';


class Register extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          firstName: "",
          lastName: "",
          email: "",
          password:"",
          confirmPassword: ""
            
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
      e.preventDefault();

      const newAccount = accountConstructor(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password,
        this.state.confirmPassword,
      )
      console.log("submit");
      // API.addAccount(newAccount).then(res => {
      //   this.renderResponse('success')
      //   this.resetState()

      // })
      // .catch(err => {
      //   this.renderResponse('fail')
      // })

    }

  
    // renderResponse = (res) => {
    // }


  
    render() {
        return(<div>
            <form className="addBarForm" autoComplete="off" >
            <div className="form-wrapper">
              <div className="form-row">
                  <fieldset className="form-column" id='meta-form'>
                  <h2>Register</h2>
                
                  <div className="input-row">
                    <div className="input-wrapper">
                      <label htmlFor="firstName">First Name</label>
                      <input name="firstName" type="text" id="firstName" placeholder="John" onChange={this.onChange}  />
                    </div>
                  </div>
                  
                  <div className="input-row">
                    <div className="input-wrapper">
                        <label htmlFor="lastName">Last Name</label>
                        <input name="lastName" type="text" id="name" placeholder="Smith" onChange={this.onChange}  />
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
                      <label htmlFor="passwordConfirm">Confirm Password</label>
                      <input name="passwordConfirm" type="text" id="passwordConfirm" placeholder="" onChange={this.onChange}  />
                    </div>
                  </div>
                  
                  </fieldset>
                 
                </div>
                <button type='submit' className="btn-slide light" onClick={this.onSubmit}>
                    <h4>Submit</h4>  
                    <span className="button-bar"></span>  
                  </button>
              </div>
            </form>
        </div>);
    }
}

export default Register