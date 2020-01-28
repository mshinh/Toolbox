import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";




const ContactDisplay = ({active}
) => {
 
 

  return (<Fragment>
    
    {active ?
      <Fragment>
        <div className="contact-display-container">
        <div className="contact-header">
          <div
            className="contact-image"
            style={{ backgroundImage: `url(${active.user.userphoto})` }}
          ></div>
          <div className="contact-info-name">
           <div> <h2>{active.user.fname} {active.user.lname} </h2>
                 <h3>{active.occupation && <span>{active.occupation}</span>}</h3>
                 <hr/>
                 <h4>Phone: {active.phone}</h4>
                 <h4>Email: {active.user.email}</h4>
            </div>
            <Link to={`/friend/${active._id}`} className="input-btn">
            <h4>View Profile</h4>
                <span className="button-bar"></span>
          

            </Link>
            
          
          </div>
        </div>
          <div className="contact-meta-info">
              <div className="contact-row">
                <div className="column">
                  <h2>Skills</h2>
                  <div className="skill-container">
                    <h4>Saw Tools</h4>
                    <h4>Drywall</h4>
                    <h4>Mortar</h4>
                    <h4>Other</h4>
                  </div>
                </div>
                <div className="column last">
                  <h2>Location</h2>
                  <h4>{active.location}</h4>
                </div>
              </div>
              <div className="contact-row">
                <div className="column">
                <button  className="input-btn">
                  <h4>Accept Contact</h4>
                      <span className="button-bar"></span>
                

                </button>
                </div>
                <div className="column last">
                <button  className="input-btn">
                  <h4>Decline Contact</h4>
                      <span className="button-bar"></span>
                

                </button>
                </div>
              </div>
          </div>

        </div>
     </Fragment>
    : <Fragment><h2>Nothing</h2></Fragment>}
     
    </Fragment>
    );
};

// ContactDisplay.propTypes = {
 
//       //  active: PropTypes.object,
  
// };

const mapStateToProps = state => ({
  
  //  active: state.activeDisplay,
  
});

export default connect(mapStateToProps)(ContactDisplay);
