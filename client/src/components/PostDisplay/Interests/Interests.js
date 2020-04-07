import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInterest, assignTradesperson, updateStatus } from "../../../actions/post";
import { Link } from "react-router-dom";
import Spinner from "../../Layout/Spinner";
import userImage from "../../../assets/images/f_trades.jpg";
import {
  Button
} from "reactstrap";
import "./style.scss";

const Interests = ( {
  getInterest,
  profile: {profiles, loading },
  assignTradesperson,
  updateStatus,
  auth: {user}
}) => {
  useEffect(() => {
    getInterest();
    
  }, []);


  const assign = (id) => {
    console.log("assign id", id);
    assignTradesperson(id);
  }
  return loading && user === null && profiles ? (
    <Spinner />
  )      : (
              <div className="friend-container">
                <h2> Interested Skilled Workers </h2>
                <div className="friend-list">
                {profiles.length > 0 ? (
                  profiles.map(profile => (
                    <div>
                      {profile.user.userphoto ? (
                  <img class="contact-image" src={profile.user.userphoto} alt="" />
                ) : (
                  <img class="contact-image" src={userImage} alt="" />
                )}
                <br></br>
                <h4 className="name">{profile.user.fname} {profile.user.lname}</h4>
                <h5>{profile.occupation}</h5>
                <Button type="button"
                className="btn btn-success"
                onClick = { e =>{ assign(profile.user._id)} }
                >
                  Assign Project
                </Button>
                <Button type="button"
                className='btn btn-danger' 
                >
                  Reject
                </Button>
                      </div>    
                  ))
                ) :
                (
                  <h4>No Interested Users</h4>
                )}
              </div>
              </div>
  );
};
Interests.propTypes = {
  getInterest: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateStatus: PropTypes.func.isRequired,
  assignTradesperson: PropTypes.func.isRequired,
 
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});


export default connect(mapStateToProps, { getInterest, assignTradesperson, updateStatus })(Interests);;
