import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import ProfileItem from "./ProfileItem";

import { getProfiles } from "../../actions/profile";
import ContactDisplay from "./ContactDisplay";

const Profiles = ({
  getProfiles,
  profile: { profiles, loading },
  auth: { user }
}) => {
  useEffect(() => {
    getProfiles();
  }, []);

  const updateActive = (profile) => {
    console.log(profile);
  }
  const [activeDisplay, setDisplay] = useState({
    profile: {},
  });


  
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="friend-container">
            <h2>Contact Center</h2>
            <div className="friend-list">
              {profiles.length > 0 ? (
                profiles.map(profile => (
                      <ProfileItem key={profile._id}  profile={profile} />
                ))
              ) : (
                <h4>No Contacts Found</h4>
              )}
            </div>
          
          </div>
          <div className="displayContainer">
                <ContactDisplay activeDisplay={activeDisplay} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
