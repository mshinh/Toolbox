import React,{Component} from 'react';
import './style.scss';
import {signin,authenticate} from "../../../actions/auth";
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            error:"",
            redirectToReferer:false,
            active: false
        }
        this.onChange  = this.onChange.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
    }

    onChange = (e) => {
        this.setState({error:""});
        this.setState({[e.target.name]: e.target.value});
    }

    toggleLogin = (e) => {
        if(e){
            e.preventDefault();
        }

        this.setState({
            active: !this.state.active
        });             
                
    }
    
    onSubmit = (e) => {
        if(e){
            e.preventDefault();
        }
        // this.setState({
        //     active: !this.state.active
        // })
        
        const {email,password} = this.state;

        const user = {
            email,
            password
        };

        // console.log("test");
        console.log(user);
        
        signin(user).then(data => {
            if(data.error) {
                this.setState({error: data.error})
            } else {
                //authenticate the user
                authenticate(data,() => {
                    this.setState({redirectToReferer: true})
                });

                // Calls parent method to change dashboard apppearnce, not sure if best way
                this.props.logger();
               
            }
        });
        
        
    };

    

    render() {
        const {email,password,error,redirectToReferer} = this.state;

        if(redirectToReferer){
            return <Redirect to="/"/>
        }
        return(<div>
           <div className={`login-area ${this.state.active ? 'active' : " "}`}>
                <div className="login-button" onClick={(e) => this.toggleLogin(e)}>
                   <h2>Login</h2>
                </div>
                

                <div className="login-form">
                    <form className="addBarForm" autoComplete="off" >
                        <div className="form-wrapper">
                        <div className="form-row">
                            <fieldset className="form-column" >
                            <h2 className="input-heading">Login</h2>
                                <div className="alert alert-danger" style={{display: error ? "": "none"}}>{error}</div>
                                <div className="input-row">
                                    <div className="input-wrapper">
                                        <label htmlFor="loginEmail">Email</label>
                                        <input name="email" type="text" id="loginEmail" placeholder="" onChange={this.onChange}  />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-wrapper">
                                    <label htmlFor="loginPassword">Password</label>
                                    <input name="password" type="password" id="loginPassword" placeholder="" onChange={this.onChange}  />
                                    </div>
                                </div>
                            
                            </fieldset>
                            
                            </div>
                            <div className="form-row">
                                <button type='submit' className="input-btn" onClick={(e) => this.onSubmit(e)}>
                                  
                                    <span className="button-bar"></span>  
                                    <h4>Login</h4>  
                                </button>

                                <button type='submit' className="input-btn cancel" onClick={(e) => this.toggleLogin(e)}>
                                   
                                    <span className="button-bar"></span>  
                                    <h4>Close</h4>  
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
           </div>
        </div>);
    }
}

export default Login