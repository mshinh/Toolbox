
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


const Post = (props,
  auth,
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
  let { id, userId, title, body, name, location, imgCollection, postStatus, tags } = props.currPost;

  return (
      <div
        className={`post-content ${props.active ? "active" : "notActive"}`}
      >
        <div className="post-template">
        <div className="post-left-column">
          <h3>Posting Is:  <span className={`status ${postStatus}`}>{postStatus}</span> </h3>
          <h1>{title}</h1>
          
          <p>{body}</p>
          
          <div className="image-container">
              {
                imgCollection.map( (img) => (
                  // <div className="preview-image" background>
                  //   <img src={window.location.origin + "/public/" + img} alt="image" />
                  // </div> 
                  <div
                  className="image-item"
                  style={{ backgroundImage: `url(${window.location.origin + "/public/" + img})` }}>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="post-right-column">
          <div className="location"> 
             <h3>{location}</h3>
            </div>
            <div className="tags-display">
             
             <h3>{ tags }</h3>
            </div>


            {props.accountHome ? null : ( 
            ( 
            //  auth.loading === false &&
            //  !auth.user._id === userId  &&
            //  console.log("hellllooooo",auth.isAuthenticated)  (
            <div>
           
            <h2>Are you interested ?</h2>
            
            <button  className="input-btn post-btn"  onClick={ e => props.addInt(id)}>
            <h4>Contact {name}</h4>
                  <span className="button-bar"></span>
            </button>
            </div>) 
            )}
        
           
         
              
             
          
            


            {props.accountHome && props.currPost.interest ? (<div>
              <div className="interest-container">
                <h3>List Of Interested</h3>
              {props.currPost.interest.map(inx => {
                return(
                <div className="int-item">
                  <h4>User: {findName(inx.user)}</h4>
                  <Link to={`/friend/${inx.user}`} className="side-btn input-btn">
                   <h4>More</h4>
                    <span className="button-bar"></span>


                  </Link> 
                  <div className="buttom-container">
                  <button
                    type="submit"
                    onClick={e => {
                      assign(inx.user);
                    }}
                    className="input-btn"
                  >
                    <h4>Accept</h4>
                    <span className="button-bar"></span>
                  </button>
                  </div>
                     
                  </div>)
              })}
              </div>
              <div className="assigned">
                <h3>Current Assigned User: {props.currPost.assigned}</h3>
              </div>              
              <div className="close-project-container"> 
              <h2>Close Project?</h2>
              <p>If the post has been satisfied, you can close the project.</p>

                <div className="buttom-container">
                  <button
                    type="submit"
                    onClick={e => {
                      status("Completed");
                    }}
                    className="input-btn"
                  >
                    <h4>Close Project</h4>
                    
                    <span className="button-bar"></span>
                  </button>
                </div>
              </div>

            </div>) : null}
         

           

        </div>

        </div> 

        <div className="close-content" onClick={e => props.toggle(false)}>
          <h3>Close</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
          <path id="Icon_ionic-ios-close-circle" data-name="Icon ionic-ios-close-circle" d="M15.875,3.375a12.5,12.5,0,1,0,12.5,12.5A12.5,12.5,0,0,0,15.875,3.375ZM19.042,20.4l-3.167-3.167L12.708,20.4a.96.96,0,1,1-1.358-1.358l3.167-3.167L11.35,12.708a.96.96,0,0,1,1.358-1.358l3.167,3.167,3.167-3.167A.96.96,0,1,1,20.4,12.708l-3.167,3.167L20.4,19.042a.965.965,0,0,1,0,1.358A.954.954,0,0,1,19.042,20.4Z" transform="translate(-3.375 -3.375)" fill="#707070"/>
        </svg>


        </div>
      </div>

    );
  }





Post.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  assignTradesperson: PropTypes.func.isRequired,
  getPostProfiles: PropTypes.func.isRequired,
  postProfiles: PropTypes.object.isRequired,
  

};

const mapStateToProps = state => ({
 

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