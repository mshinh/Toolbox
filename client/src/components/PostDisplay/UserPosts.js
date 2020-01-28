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
import { getUserPosts } from "../../actions/post";
import Spinner from "../Layout/Spinner";

const UserPostDisplay = ({
  getUserPosts,
  post: { posts },
  auth: { user, loading }
}) => {
  const [currpost, updateCurr] = useState({
    title: "",
    body: "",
    name: "",
    location: "",
    imgCollection: []
  });
  const [active, updateActive] = useState(false);

  const activeContent = post => {
    updateCurr({ title: post.title, body: post.body, name: post.name, location: post.location, imgCollection: post.imgCollection });
    updateActiveState(true);
  };
  const updateActiveState = newSet => {
    updateActive(newSet);
  };

  useEffect(() => {
    getUserPosts(user._id);

    // getPosts();
    //The posts will be retrieved via the Search component
    // getPosts();

    // if (isAuthenticated && window.location.pathname === "/account") {
    //   getUserPosts(user._id);
    // } else {
    //   getPosts();
    // }

    // if (window.location.pathname === "/account") {
    //   // getCurrentProfile()
    //   // console.log(window.location.pathname);
    //   // console.log(user)
    //   // getPosts();
    //   console.log(user);
    //   getUserPosts(user._id);
    // } else {
    //   console.log("Get all");
    //   getPosts();
    // }
    // console.log(location.search)
  }, [getUserPosts]);

  return loading && user === null ? (
    <Spinner />
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

      <Post currPost={currpost} active={active} toggle={updateActiveState} />
    </div>
  );
};

UserPostDisplay.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getUserPosts
})(withRouter(UserPostDisplay));
