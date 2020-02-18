import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";
import fillerPhoto from "../../assets/images/f_trades.jpg";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { addContact } from '../../actions/profile'

const ContactDisplay = ({
  active,
  addContact,
  auth: { user }
}
) => {
  function confirm(e) {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to accept contact.',
      buttons: [
        {
          label: 'Yes',
          // onClick: () => alert('Contact added!'), 
          onClick: () => {
            addContact(active._id);
            //alert('Contact added!');
          }
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    })
  }

  let friendImage;
  if (active && active.user.userphoto) {
    friendImage = <div
      className="contact-image"
      style={{ backgroundImage: `url(${active.user.userphoto})` }}
    ></div>;
  } else {
    friendImage = <div
      className="contact-image"
      style={{ backgroundImage: `url(${fillerPhoto})` }}
    ></div>;
  }


  let item;
  if (active) {

    let isFriend = user.contact.includes(active._id);

    item = isFriend ? <div className="column">
      <Link to={`/contacts`} className="input-btn">
        <h4>Contact</h4>
        <span className="button-bar"></span>
      </Link>
    </div> :
      <div className="column">
        <button className="input-btn" onClick={e => confirm(e)}>
          <h4>Add Contact</h4>
          <span className="button-bar"></span>
        </button>
      </div>

  }


  return (<Fragment>

    {active ?
      <Fragment>
        <div className="contact-display-container">
          <div className="contact-header">
            {friendImage}
            <div className="contact-info-name">
              <div> <h2>{active.user.fname} {active.user.lname} </h2>
                <h3>{active.occupation && <span>{active.occupation}</span>}</h3>
                <hr />
                <h4>Phone: {active.phone}</h4>
                <h4>Email: {active.user.email}</h4>
              </div>
              <Link to={`/friend/${active.user._id}`} className="input-btn">
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
              {item}
            </div>
          </div>

        </div>
      </Fragment>
      : <Fragment><h2>Nothing</h2></Fragment>}

  </Fragment>
  );
};

ContactDisplay.propTypes = {
  auth: PropTypes.object.isRequired
  //  active: PropTypes.object,

};

const mapStateToProps = state => ({
  auth: state.auth
  //  active: state.activeDisplay,

});

export default connect(mapStateToProps, {
  addContact
})(ContactDisplay);