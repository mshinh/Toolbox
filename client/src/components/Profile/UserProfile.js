import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import ProfileActions from "./ProfileActions";
import PortfolioItem from "../Portfolio/PortfolioItem";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import userImage from "../../assets/images/f_trades.jpg";
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
      <ProfileActions />
      <div className="profile-content">
        {profile === null ? (
          <Fragment>
            <div className="profile-grid my-1">
              <div class="profile-top bg-light p-2">
                {user.userphoto ? (
                  <img class="round-img my-1" src={user.userphoto} alt="" />
                ) : (
                  <img class="round-img my-1" src={userImage} alt="" />
                )}
                <h1 class="large">
                  Welcome {user.fname} {user.lname}
                </h1>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                  Create Profile
                </Link>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="profile-grid my-1">
              <div class="profile-top bg-light p-2">
                {user.userphoto ? (
                  <img class="round-img my-1" src={user.userphoto} alt="" />
                ) : (
                  <img class="round-img my-1" src={userImage} alt="" />
                )}
                <h1 class="large">
                  Welcome {user.fname} {user.lname}
                </h1>
                <p class="lead">{profile.occupation}</p>
                <p>{profile.location}</p>
                <div className="icons my-3">
                  <ul>
                    <li class="p-1">
                      <i class="lnr lnr-phone-handset"></i> {profile.phone}
                    </li>
                    <li class="p-1">
                      <i class="lnr lnr-envelope" /> {user.email}
                    </li>
                    <li class="p-1">
                      <i class="lnr lnr-calendar-full"></i>{" "}
                      {
                        <Moment format="DD/MM/YYYY">
                          {moment.utc(profile.dob)}
                        </Moment>
                      }
                    </li>
                  </ul>
                </div>
                <div class="icons my-1">
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fas fa-globe fa-2x"></i>
                  </a>

                  {profile.social ? (
                    <a
                      href={profile.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fab fa-facebook fa-2x"></i>
                    </a>
                  ) : (
                    ""
                  )}
                  {profile.social ? (
                    <a
                      href={profile.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i class="fab fa-instagram fa-2x"></i>
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="profile-about bg-light p-2">
                {profile.bio && (
                  <Fragment>
                    <h2>{user.fname.trim().split(" ")[0]}'s Bio</h2>
                    <p>{profile.bio}</p>
                    <div className="line" />
                  </Fragment>
                )}
                <h2>Skill Set</h2>
                {/* <div className="skills">
                  {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                      <i className="fas fa-check" /> {skill}
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
            <div className="portfolio-board">
              {profile.portfolio.length > 0 ? (
                <h2>Portfolio Preview</h2>
              ) : (
                <h2>Create A Portfolio Below</h2>
              )}
              {profile.portfolio.length > 0 ? (
                profile.portfolio.map(
                  portf => <PortfolioItem key={portf._id} portfolio={portf} />
                  // console.log(portf._id)
                )
              ) : (
                <h4></h4>
              )}
            </div>
          </Fragment>
        )}

        {/* KATE ADD USER INFO HERE */}
        {/* </div> */}
        {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}
        <div className="profile-content">
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
            <i className="fas fa-user-minus" /> Delete My Account
          </button>
        </div>
      </div>
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
