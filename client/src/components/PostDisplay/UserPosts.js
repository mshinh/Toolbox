import React, { Component, useState, useEffect } from "react";
import Post from "./Post/Post.js";
import "./style.scss";
import {
  Link,
  withRouter,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserPosts } from "../../actions/post";
import { getPostProfiles } from "../../actions/profile";

import Spinner from "../Layout/Spinner";

const UserPostDisplay = ({
  getUserPosts,
  getPostProfiles,
  postProfiles,
  // postProfile: {postProfiles},
  post: { posts },
  auth: { user, loading }
}) => {
  const [currpost, updateCurr] = useState({
    id: "",
    assigned: "",
    postStatus: "",
    interest : [],
    title: "",
    body: "",
    name: "",
    location: "",
    imgCollection: []
  });
  const [active, updateActive] = useState(false);

  const activeContent = post => {
 
    updateCurr({ id: post._id, assigned: post.assigned,  postStatus: post.postStatus,  interest: post.interest, title: post.title, body: post.body, name: post.name, location: post.location, imgCollection: post.imgCollection });
    var intAccount = "";
    
    // post.interest.map(e => {
    //   intAccount = intAccount + "," + e.user;
    // })
    // intAccount = intAccount.substring(1);
    
    // console.log(intAccount);
    
    // getPostProfiles(intAccount);
    updateActiveState(true);

  };
  const updateActiveState = newSet => {
    
    updateActive(newSet);
  };

  useEffect(() => {
    getUserPosts(user._id);

  
  }, [getUserPosts]);

  return loading && user === null ? (
    <Spinner />
  ) : (
    <div className="home-container">
      <div className="page-heading">
        {/* {user.fname} */}
        <h1>Welcome To Your Home Page</h1>
        <h2>
          Your one stop location for <br />
          skilled workers and opportunities{" "}
        </h2>
      </div>
      {/* Make this a class */}
      <div className="post-template">
        <div className="post-popup">
          {/* This has to be moved becasue it will take up the entire home page */}
        </div>
        <div className="post-board">
          {/* {this.createPosts()} */}
          {posts.map(post => (
            <div key={post._id} className="post">
              <h4>{post.name}</h4>
              <h3>{post.title}</h3>
              {
                post.imgCollection.map( (img) => (
                  <img src={window.location.origin + "/public/" + img} alt="image" />
                ))
              }
              <div className="buttom-container">
                <button
                  type="submit"
                  onClick={e => {
                    activeContent(post);
                  }}
                  className="input-btn"
                >
                  <h4>More Information</h4>
                  <span className="button-bar"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Post currPost={currpost} active={active} addInt={updateActiveState} toggle={updateActiveState} accountHome={true} />
    </div>
  );
};

UserPostDisplay.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  getPostProfiles: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  postProfile: PropTypes.object.isRequired,
  postProfiles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  postProfile: state.postProfile,
  postProfiles: state.postProfiles,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getUserPosts, getPostProfiles
})(withRouter(UserPostDisplay));
