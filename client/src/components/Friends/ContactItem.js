import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";
//import fillerPhoto from "../../../public/f_trades.jpg";
import fillerPhoto from "../../assets/images/f_trades.jpg";

const ContactItem = ({
    profile: {
      user: { _id, fname, lname, userphoto, email  },
      phone,
      occupation,
      photo
    }, updateActive, profile
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
    style={{ backgroundImage: `url(${fillerPhoto})` }}
    ></div>;
    }

    return (
        <div className="friend-item" onMouseEnter={e => updateActive(profile)}>
      
        {friendImage}
        
        <div className="friend-info">
         <div className="meta-info">
            <h2>
              {fname} {lname}
            </h2>
            <h3>{occupation && <span>{occupation}</span>}</h3>
            <h3>{email && <span>{email}</span>}</h3>
            <h3>{phone && <span>{phone}</span>}</h3>
        
          </div>
          <div className="link-contents">
            <Link to={`/friend/${_id}`} className="side-btn long">
              <span>delete</span>  
             {/* 
             <svg xmlns="http://www.w3.org/2000/svg" width="25.438" height="19.27" viewBox="0 0 25.438 19.27">
                <path id="Icon_material-more" data-name="Icon material-more" d="M23.02,4.5H7.325a1.969,1.969,0,0,0-1.664.921L0,13.917,5.661,22.4a2.108,2.108,0,0,0,1.737.931H23.02a2.1,2.1,0,0,0,2.093-2.093V6.593A2.1,2.1,0,0,0,23.02,4.5ZM9.417,15.487a1.57,1.57,0,1,1,1.57-1.57A1.567,1.567,0,0,1,9.417,15.487Zm5.232,0a1.57,1.57,0,1,1,1.57-1.57A1.567,1.567,0,0,1,14.649,15.487Zm5.232,0a1.57,1.57,0,1,1,1.57-1.57A1.567,1.567,0,0,1,19.881,15.487Z" transform="matrix(-1, -0.017, 0.017, -1, 25.031, 23.769)"/>
              </svg>
             */ }
  
  
            </Link>
            
            <button className="side-btn ">
              <svg xmlns="http://www.w3.org/2000/svg" width="25.091" height="24.182" viewBox="0 0 25.091 24.182">
                  <path id="Icon_material-message" data-name="Icon material-message" d="M25.582,3H5.509a2.461,2.461,0,0,0-2.5,2.418L3,27.182l5.018-4.836H25.582a2.472,2.472,0,0,0,2.509-2.418V5.418A2.472,2.472,0,0,0,25.582,3ZM23.073,17.509H8.018V15.091H23.073Zm0-3.627H8.018V11.464H23.073Zm0-3.627H8.018V7.836H23.073Z" transform="translate(-3 -3)"/>
              </svg>
            </button>
            
          </div>
        </div>
      </div>
    
    
    
    );
  };

  ContactItem.propTypes = {
    profile: PropTypes.object.isRequired,
    updateActive: PropTypes.func.isRequired
  };
  
  
  
  
  const mapStateToProps = state => ({
    
    profile: state.profile,
    activeDisplay: state.activeDisplay
  
  });

  export default ContactItem;