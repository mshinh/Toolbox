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

  
  const [activeDisplay, setDisplay] = useState();

  const updateActive = (profile) => {
    setDisplay(profile)
  }
  
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="friend-container">
            <h2>Contact Center</h2>
            <h3>Keep track of your contacts for future reference</h3>
            <div className="friend-list">
              {profiles.length > 0 ? (
                profiles.map(profile => (
                      <ProfileItem key={profile._id} updateActive={updateActive}   profile={profile} />
                ))
              ) : (
                <h4>No Contacts Found</h4>
              )}
            </div>
          
          </div>
          <div className="displayContainer">
                <ContactDisplay  active={activeDisplay}/>
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
