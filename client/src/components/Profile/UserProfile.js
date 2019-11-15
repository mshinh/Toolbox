import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import ProfileActions from "./ProfileActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

import "./style.scss";


const UserProfile = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="profile-content">
        <h1>Profile</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user.fname}
        </p>
      </div>
      {profile !== null ? (
        <Fragment>
            <div className="profile-content">
              <h3>{user.email}</h3>

              {/* KATE ADD USER INFO HERE */}

            </div>
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}

          <div className="profile-content">
          <ProfileActions />

            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="profile-content">
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  UserProfile
);
