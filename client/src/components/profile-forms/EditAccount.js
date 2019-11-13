import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateAccount, getCurrentProfile } from "../../actions/profile";

const EditAccount = ({
  profile: { profile, loading },
  updateAccount,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      fname: loading || !user.fname ? "" : user.fname,
      lname: loading || !user.lname ? "" : user.lname,
      email: loading || !user.email ? "" : user.email,
      password: loading || !user.password ? "" : user.password
    });
  }, [loading, getCurrentProfile]);

  const { dob, gender, location, phone, occupation, website, bio } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <form className="addBarForm" autoComplete="off">
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset className="form-column" id="meta-form">
              <h2 className="input-heading">Update Profile</h2>

              {/* <div className="alert alert-danger" style={{display: error ? "": "none"}}>{error}</div>

                     <div className="alert alert-info" style={{display: open ? "": "none"}}>  </div> */}

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
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="password">Update Password</label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder=""
                    onChange={e => onChange(e)}
                    value={password}
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
export default connect(mapStateToProps, { updateAccount, getCurrentProfile })(
  withRouter(EditAccount)
);
