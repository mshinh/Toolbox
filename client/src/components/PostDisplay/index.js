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
import { getPosts, addInterested } from "../../actions/post";
import Spinner from "../Layout/Spinner";

const PostDisplay = ({ getPosts, addInterested, postProfiles, post: { posts, loading } }) => {
  const [currpost, updateCurr] = useState({
    postStatus: "",
    id: "",
    title: "",
    body: "",
    name: "",
    location:"",
    imgCollection: [],
    
  });
  const [active, updateActive] = useState(false);
  const [lazyLoad, lazyToggle] = useState(false);

  const activeContent = post => {
    updateCurr({ id: post._id, postStatus: post.postStatus, tags: post.tags, interest: post.interest, title: post.title, body: post.body, name: post.name, location: post.location, imgCollection: post.imgCollection  });
    updateActiveState(true);
  };
  const updateActiveState = newSet => {
    updateActive(newSet);
  };

  useEffect(() => {
    getPosts();
    setTimeout(()=> {
      lazyToggle(true);
    }, 500)
    
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <div className={`home-container ${loading !== lazyLoad ? "lazyLoad" : " " } `}>
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
             
             <h4>{post.name}  <span className={`status ${post.postStatus}`}>{post.postStatus}</span> </h4>
                <h4>Tags: <span className="tags">{post.tags}</span></h4>
                <h2>{post.title}</h2>
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

      <Post currPost={currpost} active={active} postProfiles={postProfiles} addInt={addInterested} toggle={updateActiveState} accountHome={false}/>
    </div>
  );
};

PostDisplay.propTypes = {
  getPosts: PropTypes.func.isRequired,
  addInterested: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  postProfiles: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  post: state.post,
  postProfiles: state.postProfiles
});
export default connect(mapStateToProps, {
  getPosts, addInterested
})(withRouter(PostDisplay));
