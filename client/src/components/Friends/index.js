import React, { Component, useState, useEffect } from "react";
import Spinner from "../Layout/Spinner";
import "./style.scss";
import { Link, withRouter, Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import userImage from "./../../assets/images/f_trades.jpg";
import { getCurrentProfile} from "../../actions/profile";


const Friends = ({
  
  getCurrentProfile,
  profile: { profile, loading },
  auth: { user }
}) => {
 
  

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  
  return loading ? (
    <Spinner />
  ) : (
    <div className="friend-container">
      <h2>Friends Center</h2>

      <div className="friend-list">

        <div className="friend-item">
        
                
          <div className="friend-image" style={{backgroundImage: `url(${userImage})`}}></div>
          <div className="friend-info"> 
            
            <h3>Friend Name</h3>
            <h3>Friend Occupation</h3>
          </div>

        </div>
        
      </div>
    </div>
  );
};

Friends.propTypes = {
  
  getUserPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, {  getCurrentProfile })(
  withRouter(Friends)
);
