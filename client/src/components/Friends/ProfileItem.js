import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";

const ProfileItem = ({
  profile: {
    user: { _id, fname, lname },
    occupation,
    photo
  }
}) => {
  return (
    <div className="friend-item">
      {/* <div
        className="friend-image"
        style={{ backgroundImage: `url(${photo})` }}
      ></div> */}
      <div className="friend-info">
        <h3>
          {fname} {lname}
        </h3>
        <h3>{occupation && <span>{occupation}</span>}</h3>

        <Link to={`/friend/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
        <button
          onClick={() => console.log(fname + " " + lname)}
          className="btn btn-primary"
        >
          Add Friend
        </button>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
