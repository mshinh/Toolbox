import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import Alert from "../Layout/Alert";

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    dob: "",
    gender: "",
    location: "",
    phone: "",
    occupation: "",
    website: "",
    bio: ""
  });
  const { dob, gender, location, phone, occupation, website, bio } = formData;

  const onChange = e => {
    // const value =
    //   e.target.name === "profilePhoto" ? e.target.files : e.target.value;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <Alert />
      <form className="addBarForm" autoComplete="off">
        <div className="form-wrapper">
          <div className="form-row">
            <fieldset className="form-column" id="meta-form">
              <h2 className="input-heading">Create Profile</h2>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="profilePhoto">Profile Photo</label>
                  {/* Have to check to see if state is being updated with type date */}
                  {/* defaultValue={dob} */}
                  <input
                    name="profilePhoto"
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="dob">Date Of Birth</label>
                  {/* Have to check to see if state is being updated with type date */}
                  {/* defaultValue={dob} */}
                  <input
                    name="dob"
                    type="date"
                    id="dob"
                    value={dob}
                    placeholder=""
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="gender">Gender</label>
                  {/* Have to test select with onChange method */}
                  {/* How to set default value with select? */}
                  <select
                    name="gender"
                    id="gender"
                    placeholder=""
                    value={gender}
                    onChange={e => onChange(e)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">other</option>
                  </select>
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="location">Location</label>
                  {/* This will have to be broken down into street name, city name etc... next semester */}
                  <input
                    name="location"
                    type="text"
                    id="location"
                    placeholder="69 Street Ave"
                    onChange={e => onChange(e)}
                    value={location}
                  />
                  <small className="form-text">
                    City & state suggested (eg. Boston, MA)
                  </small>
                </div>

                <div className="input-wrapper">
                  <label htmlFor="phone">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    id="phone"
                    placeholder=""
                    onChange={e => onChange(e)}
                    value={phone}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="occupation">Occupation</label>
                  {/* We have to expand on this, people can have multiple occupations and we should standardize for searching purposes*/}
                  <input
                    name="occupation"
                    type="text"
                    id="occupation"
                    placeholder="Stone Worker"
                    onChange={e => onChange(e)}
                    value={occupation}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="website">Website</label>
                  {/* Maybe not have this at all, have to think about it*/}
                  <input
                    name="website"
                    type="text"
                    id="website"
                    placeholder="www.mysite.com"
                    onChange={e => onChange(e)}
                    value={website}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label htmlFor="bio">Bio</label>
                  {/* Maybe not have this at all, have to think about it*/}
                  <textarea
                    row="10"
                    col="80"
                    name="bio"
                    type="text"
                    id="bio"
                    value={bio}
                    placeholder="A short bio of yourself"
                    onChange={e => onChange(e)}
                  >
                    {bio}
                  </textarea>
                </div>
              </div>
            </fieldset>
          </div>
          <button
            type="submit"
            className="input-btn"
            onClick={e => onSubmit(e)}
          >
            <h4>Create</h4>
            <span className="button-bar"></span>
          </button>
        </div>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
