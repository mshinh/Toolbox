import React, { Fragment, useEffect, useState } from "react";
//import "./style.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import {
  getNotification,
  deleteNotification,
  addInterested
} from "../../actions/post";
//import { ToastContainer, Toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/ToastHeader";
import ToastBody from "react-bootstrap/ToastBody";
import Button from "react-bootstrap/Button";
//import PostDisplay from "../PostDisplay";
import Post from "../PostDisplay/Post/Post";
//import Nav from '../Dashboard/Nav/index';

const Notification = ( {
    getNotification,
    deleteNotification,
    Post,
    Notification,
    postProfiles,
    post: { posts },
    auth: { user, loading }
}
) => {


  const [currpost, updateCurr] = useState({
    postStatus: "",
    id: "",
    title: "",
    body: "",
    name: "",
    location: "",
    imgCollection: []
  });

  const [active, updateActive] = useState(false);

  const activeContent = post => {
    updateCurr({
      id: post._id,
      postStatus: post.postStatus,
      interest: post.interest,
      title: post.title,
      body: post.body,
      name: post.name,
      location: post.location,
      imgCollection: post.imgCollection
    });
    updateActiveState(true);
  };

  const updateActiveState = newSet => {
    updateActive(newSet);
  };
  // const notifications = getNotification();
  // console.log(notifications);
  /*<div>
                        <h2>Notification Center</h2>
                             <div>
                                 {posts.map( post => (
                                <div>
                                     <h4>{post.name}</h4>
                                    <h3>{post.title}</h3>
                                 </div>
                                ))} 
                              </div>
                    </div>
                    Link to="/dashboard">
                Toast.Body><strong>Post </strong><Button variant="secondary" size ="sm" 
                                    onClick={e => {
                                        activeContent(post);
                                    }}>{post.title}</Button></Toast.Body>
                    
    function viewPost(id){
        console.log("HELLO" , id);
     
    }    
    */

  function removeNotification(id) {
    console.log("DELETE", id);
    deleteNotification(id);
  }

  console.log("POSTS FROM BACKEND", posts);
  // const [showNotification, setShowNotification] = useState(true);
  // const toggleShowNotification = () => setShowNotification(!showNotification);
  return loading && user === null && posts ? (
    <Spinner />
  ) : (
    <div className="friend-container">
      <h2>Notification Center</h2>
      <>
        {" "}
        {posts.length > 0 ? (
          posts.map(post => (
            <Toast key={post._id} onClose={() => removeNotification(post._id)}>
              <Toast.Header>
                <strong className="mr-auto">{post.name}</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>
                <strong> New post available </strong>
                <Button
                  variant="link"
                  size="sm"
                  onClick={e => {
                    activeContent(post);
                  }}
                >
                  {post.title}
                </Button>
              </Toast.Body>
            </Toast>
          ))
        ) : (
          <h4>No New Notifications</h4>
        )}
      </>
      <Post
        currPost={currpost}
        active={active}
        postProfiles={postProfiles}
        addInt={addInterested}
        toggle={updateActiveState}
        accountHome={false}
      />
    </div>
  );
};

Notification.propTypes = {
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  addInterested: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, {
  getNotification,
  deleteNotification,
  addInterested
})(Notification);
