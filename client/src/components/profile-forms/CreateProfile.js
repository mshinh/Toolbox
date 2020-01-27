import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  uploadProfilePhoto,
  getCurrentProfile
} from "../../actions/profile";
import Alert from "../Layout/Alert";

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  uploadProfilePhoto,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    dob: "",
    location: "",
    phone: "",
    occupation: "",
    website: "",
    bio: "",
    facebook: "",
    instagram: ""
  });
  const [profilePhoto, setProfilePhoto] = useState({
    photo: ""
  });

  const {
    dob,
    location,
    phone,
    occupation,
    website,
    bio,
    facebook,
    instagram
  } = formData;

  const { photo } = profilePhoto;

  const onChange = e => {
    // const value =
    //   e.target.name === "profilePhoto" ? e.target.files : e.target.value;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  const onChangePhoto = e => {
    setProfilePhoto({ ...profilePhoto, [e.target.name]: e.target.files[0] });
  };

  const onUploadPhoto = e => {
    e.preventDefault();
    uploadProfilePhoto(photo);
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
                  <label htmlFor="photo">Profile Photo</label>
                  {/* Have to check to see if state is being updated with type date */}
                  {/* defaultValue={dob} */}
                  <input
                    name="photo"
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={e => onChangePhoto(e)}
                  />
                </div>
                <div className="input-wrapper">
                  <button
                    type="upload"
                    className="input-btn"
                    onClick={e => onUploadPhoto(e)}
                  >
                    <h4>Upload</h4>
                    <span className="button-bar"></span>
                  </button>
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
                  <label htmlFor="facebook">Facebook</label>
                  <input
                    name="facebook"
                    type="text"
                    id="facebook"
                    placeholder="Facebook URL"
                    onChange={e => onChange(e)}
                    value={facebook}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="instagram">Instagram</label>
                  {/* Maybe not have this at all, have to think about it*/}
                  <input
                    name="instagram"
                    type="text"
                    id="instagram"
                    placeholder="Instagram URL"
                    onChange={e => onChange(e)}
                    value={instagram}
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
  uploadProfilePhoto: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {
  uploadProfilePhoto,
  createProfile,
  getCurrentProfile
})(withRouter(CreateProfile));
