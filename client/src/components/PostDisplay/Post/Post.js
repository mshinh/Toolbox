
import React, { Component, useState, useEffect } from "react";
import "./style.scss";
//import locationImage from "../../../assets/images/one.jpg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPostProfiles, addNotification } from "../../../actions/profile";
import { assignTradesperson, updateStatus} from "../../../actions/post";
import {
  Link,
  withRouter,
  Redirect,
  RouteComponentProps
} from "react-router-dom";

import Moment from "react-moment";
import moment from "moment";

import locationImage from "../../../assets/images/loc.png";

const Post = (props
  
  ) => {
 
//console.log(props)
  useEffect(() => {
   
  if(props.active && props.currPost.interest)  { 
  //  console.log("Run get profiles");
    var intAccount = "";  
    props.currPost.interest.map(e => {
      intAccount = intAccount + "," + e.user;
    })
    intAccount = intAccount.substring(1);
    props.getPostProfiles(intAccount);
  }

  
  },);

  const assign = tradeId => {
    var delivery = props.currPost.id +","+ tradeId;
    console.log(delivery);
    props.assignTradesperson(delivery);
  };

  const status = newStatus => {
    var delivery = props.currPost.id +","+ newStatus;
    console.log(delivery);
    props.updateStatus(delivery);
  };

  function findName(userId){
    console.log("USER",userId);
    console.log("PROPS", props);
    return "Hello";
  }
  
 
  let { id, user, title, body, name, location, imgCollection, postStatus, tags, date } = props.currPost;
  //let currUser = props.currUser;
 
  function print() {
    //this is called when button clicked
    //this prints undefined
   console.log("current user" , props.currUser);
 }
  return (
      <div
        className={`post-content ${props.active ? "active" : "notActive"}`}
      >
        <div className="post-template">

          <h4>Status: {postStatus}</h4>
          <Link to={`/friend/${user}`}><h3>{name}</h3> </Link>
          <h1 className="title">{title}</h1>
          <br></br>
          <Moment format="DD/MM/YYYY" className="date">
                          {moment.utc(date)}
                        </Moment>
          <div className="clear"></div>
          <p>{body}</p>

          <div className="preview-images">
          <div
          className="image-item">
          <img src={locationImage} alt="" />
          <br></br>
          <h3 >{location}</h3>
          </div>
          </div>
          <br></br>
          {/*
            imgCollection.map((img) => (
              <img src={window.location.origin + "/public/" + img} alt="image" />
            ))
            {tags.map( (tag) => (
                  <div>
                    <h4>{tag}</h4>
                    </div>
                ))
              }
            */}
          { tags  ? (
            <div className="tags">
              
                <h3>Required Skills</h3>
                <ul>
                {tags.map( (tag) => (
                  <li><h4>{tag}</h4></li>
                  ))
                }
                </ul>
                
            </div>
          ) : <div>
           
            </div>
          } 
          <div className="clear"><br></br></div>
            {props.accountHome ? null : ( 
            ( 
            //  auth.loading === false &&
            //  !auth.user._id === userId  &&
            //  console.log("hellllooooo",auth.isAuthenticated)  (
            <div className="interest">
            <h2>Are you interested ?</h2>
            
            <button  className="input-btn" 
             onClick={ e => { props.addInt(props.currUser);
              print();
            }
          } 
            >
              <h4>Yes</h4>
                  <span className="button-bar"></span>
            </button>
            
            </div>) 
)}
        
           
           {/* <button  className="input-btn">
              <h4>Decline</h4>
                  <span className="button-bar"></span>
            </button> */}
              { /*
             <br></br>
                <button  className="input-btn">
                  <h4>Contact {name}</h4>
                      <span className="button-bar"></span>
                </button>
                */
              }
            


            {props.accountHome && props.currPost.interest ? (<div>
              <div className="interest-container">
              {props.currPost.interest.map(inx => {
                return(
                <div className="int-item"><h4>User:  {findName(inx.user)}</h4>
                  <Link to={`/friend/${inx.user}`} className="side-btn long">
                      <span>More</span>  
                      <svg xmlns="http://www.w3.org/2000/svg" width="25.438" height="19.27" viewBox="0 0 25.438 19.27">
                        <path id="Icon_material-more" data-name="Icon material-more" d="M23.02,4.5H7.325a1.969,1.969,0,0,0-1.664.921L0,13.917,5.661,22.4a2.108,2.108,0,0,0,1.737.931H23.02a2.1,2.1,0,0,0,2.093-2.093V6.593A2.1,2.1,0,0,0,23.02,4.5ZM9.417,15.487a1.57,1.57,0,1,1,1.57-1.57A1.567,1.567,0,0,1,9.417,15.487Zm5.232,0a1.57,1.57,0,1,1,1.57-1.57A1.567,1.567,0,0,1,14.649,15.487Zm5.232,0a1.57,1.57,0,1,1,1.57-1.57A1.567,1.567,0,0,1,19.881,15.487Z" transform="matrix(-1, -0.017, 0.017, -1, 25.031, 23.769)"/>
                      </svg>

                     </Link> 
                     <div className="buttom-container">
                      <button
                        type="submit"
                        onClick={e => {
                          assign(inx.user);
                        }}
                        className="input-btn"
                      >
                        <h4>Accept Interest</h4>
                        <span className="button-bar"></span>
                      </button>
                     </div>
                     
                     </div>)
              })}
              </div>

              <h3>Current Assigned User: {props.currPost.assigned}</h3>
             
              <div className="buttom-container">
                <button
                  type="submit"
                  onClick={e => {
                    status("Completed");
                  }}
                  className="input-btn"
                >
                  <h4>Project Completed</h4>
                  <span className="button-bar"></span>
                </button>
              </div>

            </div>) : null}
         

           

        </div>

       

        <div className="close-content" onClick={e => props.toggle(false)}>
          <h4>Close</h4>
        </div>
      </div>

    );
  }





Post.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  assignTradesperson: PropTypes.func.isRequired,
  getPostProfiles: PropTypes.func.isRequired,
  postProfiles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
 
  auth: state.auth,

  postProfiles: state.postProfiles
});

// Profiles.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// });

export default connect(mapStateToProps, { getPostProfiles, assignTradesperson, updateStatus})(Post);


// Post.propTypes = {
 
//   getPostProfiles: PropTypes.func.isRequired,
//   postProfile: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   postProfiles: state.postProfiles,
//   auth: state.auth
// });