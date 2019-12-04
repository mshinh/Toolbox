import React, { Component, useState, useEffect } from "react";
import Post from "./Post";
import "./style.scss";
import {
  Link,
  withRouter,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts, getUserPosts } from "../../actions/post";
import { getCurrentProfile } from "../../actions/profile";

const PostDisplay = ({
  getPosts,
  getCurrentProfile,
  getUserPosts,
  post: { posts, loading },
  auth: { user },
  isAuthenticated
}) => {
  const [currpost, updateCurr] = useState({
    title: "",
    body: "",
    name: ""
  });
  const [active, updateActive] = useState(false);

  const activeContent = post => {
    updateCurr({ title: post.title, body: post.body, name: post.name });
    updateActiveState(true);
  };
  const updateActiveState = newSet => {
    updateActive(newSet);
  };

  useEffect(() => {
    // getPosts();
    //The posts will be retrieved via the Search component
    // getPosts();

    // if (isAuthenticated && window.location.pathname === "/account") {
    //   getUserPosts(user._id);
    // } else {
    //   getPosts();
    // }

    if (window.location.pathname === "/account") {
      // getCurrentProfile()
      // console.log(window.location.pathname);
      // console.log(user)
      // getPosts();
      console.log(user);
      getUserPosts(user._id);
    } else {
      console.log("Get all");
      getPosts();
    }
    // console.log(location.search)
  }, [getUserPosts, getCurrentProfile, getPosts]);

  return loading ? (
    ""
  ) : (
    <div className="home-container">
      <div className="page-heading">
        {/* {user.fname} */}
        <h1>Welcome To Toolbox</h1>
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
              <p>{post.body}</p>
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

      <Post currPost={currpost} active={active} toggle={updateActiveState} />
    </div>
  );
};

PostDisplay.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {
  getPosts,
  getCurrentProfile,
  getUserPosts
})(withRouter(PostDisplay));
