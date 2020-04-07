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
import { getUserPosts, deletePost } from "../../actions/post";
import { getPostProfiles } from "../../actions/profile";
import Spinner from "../Layout/Spinner";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { confirmAlert } from 'react-confirm-alert';


const UserPostDisplay = ({
  getUserPosts,
  getPostProfiles,
  postProfiles,
  deletePost,
  // postProfile: {postProfiles},
  post: { posts},
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
    imgCollection: [],
   
  });
  const [active, updateActive] = useState(false);

  const activeContent = post => {
 
    updateCurr({ id: post._id, assigned: post.assigned, tags: post.tags,  postStatus: post.postStatus,  interest: post.interest, title: post.title, body: post.body, name: post.name, location: post.location, imgCollection: post.imgCollection });
    var intAccount = "";
    
    // post.interest.map(e => {
    //   intAccount = intAccount + "," + e.user;
    // })
    // intAccount = intAccount.substring(1);
    
    // console.log(intAccount);
    
    // getPostProfiles(intAccount);
    /*<Modal isOpen={modal} toggle={toggleDelete}>
    <ModalHeader toggle={toggleDelete}>Confirm</ModalHeader>  
    <ModalBody>Are you sure you want to delete this Post?</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={() => deletePost(post._id)}>
        Yes
      </Button>{" "}
      <Button color="secondary" onClick={toggleDelete}>
        Cancel
      </Button>
    </ModalFooter>          
  </Modal>
  */
    updateActiveState(true);

  };
  const updateActiveState = newSet => {
    
    updateActive(newSet);
  };

  useEffect(() => {
    getUserPosts(user._id);

  
  }, [getUserPosts]);

  const [modal, setModal] = useState(false);
  const toggleDelete = () => setModal(!modal);

  function confirm(id) {
   // e.preventDefault();
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete post?',
      buttons: [
        {
          label: 'Yes',
         // onClick: () => alert('Contact added!'), 
          onClick: () => {
            //console.log(_id);
            deletePost(id);
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
  
   
  
  return loading && user === null ? (
    <Spinner />
  ) : (
    <section>
      <div className="home-container">
        <div className="page-heading">
          {/* {user.fname} */}
          <h1>Welcome To Your Home Page</h1>
          <h2>
            You can find all your posts here.

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
                <br></br>
                  <Button
                  onClick={() => confirm(post._id)}
                  type='button'
                  className='btn btn-danger' >Delete 
                  {   } <i className='fas fa-times' />
                  </Button>
                
              </div>
            ))}
          </div>
        </div>

        <Post currPost={currpost} active={active} addInt={updateActiveState} toggle={updateActiveState} accountHome={true} />
      </div>

      
    </section>
  );
};

UserPostDisplay.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  getPostProfiles: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  postProfile: PropTypes.object.isRequired,
  postProfiles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  postProfile: state.postProfile,
  postProfiles: state.postProfiles,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getUserPosts, getPostProfiles, deletePost
})(withRouter(UserPostDisplay));
