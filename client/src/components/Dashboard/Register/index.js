import React, { Fragment, useState, Component } from "react";
import "./style.scss";
import { signup } from "../../../actions/auth";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../../Layout/Alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  });

  const { fname, lname, email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    register({ fname, lname, email, password });
  };

  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  // class Register extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       fname: "",
  //       lname: "",
  //       email: "",
  //       username: "",
  //       password: "",
  //       error: "",
  //       open: false,
  //       redirectToReferer: false
  //     };
  //     this.onChange = this.onChange.bind(this);
  //     this.onSubmit = this.onSubmit.bind(this);
  //   }

  // onChange = e => {
  //   this.setState({ error: "" });
  //   this.setState({ open: false });
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // authenticate (jwt,next) {
  //   if(typeof window !== "undefined"){
  //       localStorage.setItem("jwt",JSON.stringify(jwt));
  //       next();
  //   }

  // }
  // onSubmit = e => {
  //   e.preventDefault();

  //   const { fname, lname, email, password } = this.state;

  //   var userEmail = email.split("@");
  //   const username = userEmail[0];

  //   const user = {
  //     fname,
  //     lname,
  //     email,
  //     username,
  //     password
  //   };

  //   console.log(user);
  //   signup(user).then(data => {
  //     if (data.error) this.setState({ error: data.error });
  //     else {
  //       this.setState({
  //         fname: "",
  //         lname: "",
  //         email: "",
  //         username: "",
  //         password: "",
  //         error: "",
  //         open: true
  //       });

  //       // //authenticate the user
  //       // this.authenticate(data,() => {
  //       //   this.setState({redirectToReferer: true})
  //       //  });

  //       // Calls parent method to change dashboard apppearnce, not sure if best way
  //       //  this.props.logger();
  //     }
  //   });
  // };

  // renderResponse = (res) => {
  // }

  return (
    <Fragment>
      <form className="addBarForm" autoComplete="off">
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset className="form-column" id="meta-form">
              <h2 className="input-heading">Register</h2>

              {/* <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>

              <div
                className="alert alert-info"
                style={{ display: open ? "" : "none" }}
              >
                New account is succesfully created. Please Sign In.
              </div> */}

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="fname">First Name</label>
                  <input
                    name="fname"
                    type="text"
                    value={fname}
                    placeholder="John"
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    name="lname"
                    type="text"
                    value={lname}
                    placeholder="Smith"
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="email">Email Name</label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    placeholder="hello@toolbox.com"
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <button
            type="submit"
            className="input-btn"
            onClick={e => onSubmit(e)}
          >
            <h4>Register</h4>
            <span className="button-bar"></span>
          </button>
        </div>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  // isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
