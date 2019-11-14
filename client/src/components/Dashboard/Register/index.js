import React, { Fragment, useState, Component } from "react";
import "./style.scss";
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

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Alert />
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
