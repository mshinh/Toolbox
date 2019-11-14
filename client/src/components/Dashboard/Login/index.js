import React, { Fragment, useState, Component } from "react";
import "./style.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/auth";
import Alert from "../../Layout/Alert";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  const [active, setActive] = useState(false);

  const toggleLogin = e => {
    e.preventDefault();
    setActive(!active);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Alert />
      <div className={`login-area ${active ? "active" : " "}`}>
        <div className="login-button" onClick={e => toggleLogin(e)}>
          <h2>Login</h2>
        </div>

        <div className="login-form">
          <form className="addBarForm" autoComplete="off">
            <div className="form-wrapper">
              <div className="form-row">
                <fieldset className="form-column">
                  <h2 className="input-heading">Login</h2>
                  {/* <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                  >
                    {error}
                  </div> */}
                  <div className="input-row">
                    <div className="input-wrapper">
                      <label htmlFor="loginEmail">Email</label>
                      <input
                        name="email"
                        type="email"
                        id="loginEmail"
                        value={email}
                        placeholder="Email Address"
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="input-wrapper">
                      <label htmlFor="loginPassword">Password</label>
                      <input
                        name="password"
                        type="password"
                        id="loginPassword"
                        placeholder="Password"
                        onChange={e => onChange(e)}
                        minLength="6"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="form-row">
                <button
                  type="submit"
                  className="input-btn"
                  onClick={e => onSubmit(e)}
                >
                  <span className="button-bar"></span>
                  <h4>Login</h4>
                </button>

                <button
                  type="submit"
                  className="input-btn cancel"
                  onClick={e => toggleLogin(e)}
                >
                  <span className="button-bar"></span>
                  <h4>Close</h4>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
