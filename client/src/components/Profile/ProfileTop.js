import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";
import userImage from "../../assets/images/f_trades.jpg";
import FriendPortfolio from "../Portfolio/FriendPortfolio";

import Spinner from "../Layout/Spinner";
import Moment from "react-moment";
import moment from "moment";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Label,
  Input
} from "reactstrap";
import { addContact } from "../../actions/profile";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
// import openSocket from "socket.io-client";

const ProfileTop = ({
  profile: {
    _id,
    bio,
    location,
    occupation,
    website,
    phone,
    dob,
    portfolio,
    social,
    user: { id, fname, lname, email, userphoto }
  },
  auth: { user },
  addContact
}) => {
  function confirm(e) {
    e.preventDefault();
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to accept contact.",
      buttons: [
        {
          label: "Yes",
          // onClick: () => alert('Contact added!'),
          onClick: () => {
            console.log(_id);
            addContact(_id);
            //alert('Contact added!');
          }
        },
        {
          label: "No"
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  let item;
  let userContact = user.contact;
  console.log(user._id);
  console.log(_id);
  //if(user._id.toString() == id.toString() ){
  for (var i = 0; i < userContact.length; i++) {
    if (userContact[i] != null) {
      if (userContact[i].toString() == _id.toString()) {
        item = (
          <Link to={`/contacts`} className="btn btn-light">
            <i className="fas fa-user-plus" /> Contact
          </Link>
        );
        console.log(user._id); //user logged in
        console.log(user.contact);
      }
    } else {
      item = (
        <Link onClick={e => confirm(e)} className="btn btn-light">
          <i className="fas fa-user-plus" /> Add Contact
        </Link>
      );
    }
  }
  // } else{
  //  item=<h3>Welcome</h3>;
  // }

  const [modal, setModal] = useState(false);

  const [formMessage, setFormMessage] = useState({
    title: "",
    content: ""
  });

  const { title, content } = formMessage;

  const onChange = e => {
    setFormMessage({ ...formMessage, [e.target.name]: e.target.value });
  };

  const toggle = () => setModal(!modal);

  // const sendSocketIO = e => {
  //   console.log(formMessage);
  //   // const socket = openSocket("http://localhost:3000");
  //   // console.log("here");
  //   socket.emit("message", {
  //     fromUser: user._id,
  //     toUser: id,
  //     formMessage
  //   });
  //   setModal(!modal);
  // };

  return (
    <section>
      <section class="profile-content">
        <div className="profile-grid my-1">
          <div class="profile-top bg-light p-2">
            <div className="dash-buttons">
              {item}

              <Link onClick={toggle} className="btn btn-light">
                <i className="far fa-envelope" /> Message
              </Link>
            </div>
            {userphoto ? (
              <img class="round-img my-1" src={userphoto} alt="" />
            ) : (
              <img class="round-img my-1" src={userImage} alt="" />
            )}
            <h1 class="large">
              {fname} {lname}
            </h1>
            <p class="lead">{occupation}</p>
            <p>{location}</p>
            <div className="icons my-3">
              <ul>
                <li class="p-1">
                  <i class="lnr lnr-phone-handset"></i> {phone}
                </li>
                <li class="p-1">
                  <i class="lnr lnr-envelope" /> {email}
                </li>
                <li class="p-1">
                  <i class="lnr lnr-calendar-full"></i>{" "}
                  {<Moment format="DD/MM/YYYY">{moment.utc(dob)}</Moment>}
                </li>
              </ul>
            </div>
            <div class="icons my-1">
              {website ? (
                <a href={website} target="_blank" rel="noopener noreferrer">
                  <i class="fas fa-globe fa-2x"></i>
                </a>
              ) : (
                ""
              )}

              {social ? (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fab fa-facebook fa-2x"></i>
                </a>
              ) : (
                ""
              )}
              {social ? (
                <a
                  href={social.instagram}
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
            {bio && (
              <Fragment>
                <h2>{fname.trim().split(" ")[0]}'s Bio</h2>
                <p>{bio}</p>
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
          {portfolio ? <h2>Portfolio Preview</h2> : <h2></h2>}
          {portfolio ? (
            portfolio.map(
              portf => <FriendPortfolio key={portf._id} portfolio={portf} />
              // console.log(portf._id)
            )
          ) : (
            <h4></h4>
          )}
        </div>
      </section>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Send Message</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup></FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Request for Quote"
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                placeholder="Basement renovation"
                onChange={e => onChange(e)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={e => sendSocketIO(e)}> */}
          <Button color="primary" onClick={toggle}>
            Send
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

ProfileTop.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
  //  active: state.activeDisplay,
});

export default connect(mapStateToProps, {
  addContact
})(ProfileTop);
