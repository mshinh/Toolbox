import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import ProfileItem from "./ProfileItem";

import { getProfiles } from "../../actions/profile";

const ContactDisplay = ({
  getProfiles,
  activeDisplay,
  profile: { profiles, loading },
  auth: { user }
}) => {
 
 

  return (
    <Fragment>

     </Fragment>
  );
};

ContactDisplay.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  updateActive: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  activeDisplay: state.activeDisplay

});

export default connect(mapStateToProps, { getProfiles })(ContactDisplay);
