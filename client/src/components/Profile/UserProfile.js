import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import ProfileActions from "./ProfileActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Moment from "react-moment";
import moment from "moment";

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
          <i className="fas fa-user" /> Welcome {user.fname} {user.lname}
        </p>
      </div>
      {profile !== null ? (
        <Fragment>
          <div className="profile-content">
            <h4>{profile.gender ? profile.gender : " "}</h4>
            <h4>
              {" "}
              {<Moment format="DD/MM/YY">{moment.utc(profile.dob)}</Moment>}
            </h4>

            <h4>{profile.occupation ? profile.occupation : " "}</h4>
            <h4>{user.email}</h4>
            <h4>{profile.website ? profile.website : " "}</h4>
            <h4>{profile.phone ? profile.phone : " "}</h4>
            <h4>{profile.location ? profile.location : " "}</h4>
            <h4>{profile.bio ? profile.bio : " "}</h4>

            {/* KATE ADD USER INFO HERE */}
          </div>
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}

          <div className="profile-content">
        

            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
          <ProfileActions />
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
