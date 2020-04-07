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

const PostDisplay = ({ 
  getPosts, 
  addInterested, 
  postProfiles, 
  post: { posts, loading },
  auth
 }) => {
  const [currpost, updateCurr] = useState({
    postStatus: "",
    id: "",
    title: "",
    body: "",
    name: "",
    location:"",
    imgCollection: [],
    tags: [],
    date: "",
    user: ""
    
  });
  const [active, updateActive] = useState(false);
  const [ currUser, setCurrUser ] = useState(0);
  const activeContent = post => {
    updateCurr({ id: post._id, postStatus: post.postStatus, interest: post.interest, title: post.title, body: post.body, name: post.name, location: post.location, imgCollection: post.imgCollection, tags: post.tags, date: post.date, user: post.user  });
    updateActiveState(true);
  };
  const updateActiveState = newSet => {
    updateActive(newSet);
  };

  useEffect(() => {
    getPosts();

  
  }, [getPosts]);

  //scurrUser = "foo";
  const storeUser = id => {
    //this prints correct
    //this is called on click of a button
    
    setCurrUser(id);
    console.log("index user", currUser);
  };

  return loading ? (
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
             
              <h3>{post.title}</h3>
              <div className="preview-images">
                {
                  post.imgCollection.map( (img) => (
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
              {auth.isAuthenticated &&
            auth.loading === false &&
             (
              <div className="buttom-container">
                <button
                  type="submit"
                  onClick={e => {
                    activeContent(post);
                    storeUser(auth.user._id);
                  }}
             
                  className="input-btn"
                >
                  <h4>More Information</h4>
                  <span className="button-bar"></span>
                </button>
              </div>
            )}
              
            </div>
          ))}
        </div>
      </div>

      <Post  currUser = { currUser } currPost={currpost} active={active} postProfiles={postProfiles} addInt={addInterested} toggle={updateActiveState} accountHome={false}/>
    </div>
  );
};

PostDisplay.propTypes = {
  getPosts: PropTypes.func.isRequired,
  addInterested: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  postProfiles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  

};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  postProfiles: state.postProfiles
});
export default connect(mapStateToProps, {
  getPosts, addInterested
})(withRouter(PostDisplay));
