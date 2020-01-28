import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";

const ProfileItem = ({
  profile: {
    user: { _id, fname, lname, userphoto,  },
    occupation,
    photo
  }
}) => {
  
  let friendImage;
  if(userphoto) {
  friendImage =  <div
    className="friend-image"
    style={{ backgroundImage: `url(${userphoto})` }}
  ></div>;
  } else {
    friendImage = <div
    className="friend-image"
    style={{ backgroundImage: `url(../../../public/f_trades.jpg)` }}
  ></div>;
  }
  return (
    
    <div className="friend-item">
      
      {friendImage}
      {/* <div
        className="friend-image"
        style={{ backgroundImage: `url(${userphoto})` }}
      ></div> */}
      <div className="friend-info">
        <div className="meta-info">
          <h2>
            {fname} {lname}
          </h2>
          <h3>{occupation && <span>{occupation}</span>}</h3>
        </div>
        <div className="link-contents">
          <Link to={`/friend/${_id}`} className="side-btn long">
            View More
          </Link>
          <button className="side-btn ">
            Msg
          </button>
          {/* <button
            onClick={() => console.log(fname + " " + lname)}
            className="btn btn-primary"
          >
            Add Friend
          </button> */}
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
