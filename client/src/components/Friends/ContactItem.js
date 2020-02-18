import React, {useState} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.scss";
//import fillerPhoto from "../../../public/f_trades.jpg";
import fillerPhoto from "../../assets/images/f_trades.jpg";
import { deleteContact } from '../../actions/profile';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from "react-redux";
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
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

const ContactItem = ({
    profile: {
      user: { _id, fname, lname, userphoto, email  },
      phone,
      occupation,
      photo
    }, updateActive, profile, deleteContact
  }) => {

    function confirm(e) {
      e.preventDefault();
      confirmAlert({
        title: 'Confirm',
        message: 'Are you sure you want to remove contact.',
        buttons: [
          {
            label: 'Yes',
           // onClick: () => alert('Contact added!'), 
            onClick: () => {
              console.log(_id);
              deleteContact(_id);
              //alert('Contact removed!');
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
    if(userphoto) {
    friendImage =  <div
    className="contact-image"
    style={{ backgroundImage: `url(${userphoto})` }}
    ></div>;
    } else {
    friendImage = <div
    className="contact-image"
    style={{ backgroundImage: `url(${fillerPhoto})` }}
    ></div>;
    }

    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);

    return (
        <div  onMouseEnter={e => updateActive(profile)}>
          <div class="contact-item">
            {friendImage}
          
         </div>
             <Row xs="4">
                <Col className="col"><Link to={`/friend/${_id}`}>{fname} {lname}</Link></Col>
                <Col className="col">{occupation}</Col>
                <Col className="col"><i class="lnr lnr-phone-handset"></i> {phone}</Col>
                <Col className="col"><i class="lnr lnr-envelope" />{email}</Col>
                <Col><button className="btn btn-danger" onClick={e => confirm(e)}>
           Delete
          </button></Col>
              
            </Row>     
        </div>

  );
  };

  ContactItem.propTypes = {
    profile: PropTypes.object.isRequired,
    updateActive: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    
    profile: state.profile,
    activeDisplay: state.activeDisplay
  
  });

  export default connect(null, {deleteContact})(ContactItem);




