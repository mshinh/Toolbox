import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="profile-actions-container">
      <Link to="/edit-profile" className="input-btn">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      <Link to="/edit-account" className="input-btn">
        <i className="fab fa-black-tie text-primary" /> Edit Account
      </Link>
      <Link to="/add-portfolio" className="input-btn">
        <i className="fas fa-graduation-cap text-primary" /> Add Portfolio
      </Link>
    </div>
  );
};

export default ProfileActions;
