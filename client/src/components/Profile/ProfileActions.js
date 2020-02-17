import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditProfile from "../profile-forms/EditProfile";

const ProfileActions = () => {
  // const [collapse, setCollapse] = useState(false);
  // const [status, setStatus] = useState("Closed");

  // const onEntering = () => setStatus("Opening...");

  // const onEntered = () => setStatus("Opened");

  // const onExiting = () => setStatus("Closing...");

  // const onExited = () => setStatus("Closed");

  // const toggle = () => setCollapse(!collapse);

  return (
    <div className="profile-actions-container">
      <Link to="/edit-profile" className="input-btn bg-light">
        <i className="fas fa-user-circle" /> Edit Profile
      </Link>
      {/* <Button className="input-btn bg-light" onClick={toggle}>
        <i className="fas fa-user-circle" /> Edit Profile
      </Button> */}
      <Link to="/edit-account" className="input-btn bg-light">
        <i className="fas fa-user-cog" /> Edit Account
      </Link>
      {/* <Link to="/portfolio" className="input-btn bg-light">
        <i className="fas fa-briefcase" /> Add Portfolio
      </Link> */}
      {/* <Collapse
        isOpen={collapse}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        onExited={onExited}
      >
        {EditProfile}
      </Collapse> */}
    </div>
  );
};

export default ProfileActions;
