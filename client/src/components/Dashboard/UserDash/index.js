import React, { Fragment, useEffect } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../../actions/profile";

import userImage from "../../../assets/images/f_trades.jpg";
import Spinner from "../../Layout/Spinner";

const UserDash = ({
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
      <div className="user-item">
        {profile === null || profile.photo === null ? (
          <div
            className="user-picture"
            style={{ backgroundImage: `url(${userImage})` }}
          ></div>
        ) : (
          <div
            className="user-picture"
            // style={{ backgroundImage: `url(${userImage})` }}
            style={{
              backgroundImage: `url(${profile.photo})`
            }}
          ></div>
        )}

        <div className="user-detail">
          <h3>
            {/* Have to put the user name here */}
            Hello {user && user.fname} {user.lname} !
          </h3>
        </div>
      </div>
    </Fragment>
  );
};

UserDash.propTypes = {
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
  UserDash
);
