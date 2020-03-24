import React, { Fragment, useEffect, useState } from "react";
//import "./style.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import { getNotification, deleteNotification } from '../../actions/post';
//import { ToastContainer, Toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import Button from 'react-bootstrap/Button';
import PostDisplay from "../PostDisplay";
//import Post from '../PostDisplay/Post/Post';

const Notification = ( {
    getNotification,
    deleteNotification,
    post: { posts },
    auth: { user, loading }
}
) => {
    useEffect(() => {
       getNotification();    
      }, [getNotification]);

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
                    */
    function viewPost(id){
        console.log("HELLO" , id);
     
    }    
    function removeNotification(id){
        console.log("DELETE", id);
        deleteNotification(id);
    }       
    
    console.log("POSTS FROM BACKEND", posts);
   // const [showNotification, setShowNotification] = useState(true);
   // const toggleShowNotification = () => setShowNotification(!showNotification);
    return loading && user === null && posts ? (
        <Spinner />
    )      :     (
                    <div>
                        <h2>Notification Center</h2>
                        <>
                            { posts.map( post => (
                                <Toast key={post._id} onClose={() => removeNotification(post._id)}>
                                    <Toast.Header>
                                    <strong className="mr-auto">New post available!</strong>
                                    <small>just now</small>
                                    </Toast.Header>
                                    <Toast.Body><Button variant="secondary" size ="sm" 
                                    onClick={viewPost(post._id)}><Link to="/dashboard">{post.title}</Link></Button></Toast.Body>
                                </Toast> 
                                )
                             ) }   
                        </>
                   </div>
                 );
};

Notification.propTypes = {
    getNotification: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { getNotification, deleteNotification })(Notification);