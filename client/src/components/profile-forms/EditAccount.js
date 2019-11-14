import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateAccount, getCurrentProfile } from "../../actions/profile";

import Alert from "../Layout/Alert";

const EditAccount = ({
  profile: { profile, loading },
  getCurrentProfile,
  updateAccount,
  history
}) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    passwordold: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      fname: loading || !profile.user.fname ? "" : profile.user.fname,
      lname: loading || !profile.user.lname ? "" : profile.user.lname,
      email: loading || !profile.user.email ? "" : profile.user.email
    });
  }, [loading, getCurrentProfile]);

  const { fname, lname, email, password, passwordold } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    updateAccount(formData, history, true);
  };

  return (
    <Fragment>
      <Alert />
      <form className="addBarForm" autoComplete="off">
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset className="form-column" id="meta-form">
              <h2 className="input-heading">Update Account</h2>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="fname">First Name</label>
                  {/* defaultValue= {repEmail} */}
                  <input
                    name="fname"
                    type="text"
                    id="fname"
                    placeholder="John"
                    onChange={e => onChange(e)}
                    value={fname}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    name="lname"
                    type="text"
                    id="lname"
                    placeholder="Smith"
                    onChange={e => onChange(e)}
                    value={lname}
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="hello@toolbox.com"
                    onChange={e => onChange(e)}
                    value={email}
                    required
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="password">Current Password</label>
                  <input
                    name="passwordold"
                    type="password"
                    id="passwordold"
                    placeholder=""
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="password">New Password</label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder=""
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="input-btn"
                onClick={e => onSubmit(e)}
              >
                {" "}
                <h4>Update</h4>
                <span className="button-bar"></span>
              </button>
            </fieldset>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

EditAccount.propTypes = {
  updateAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {
  updateAccount,
  getCurrentProfile
})(withRouter(EditAccount));
