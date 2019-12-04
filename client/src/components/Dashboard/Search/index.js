



import React, { Component, useState, useEffect } from "react";

import "./style.scss";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts, getUserPosts } from "./../../../actions/post";

const Search = ({
  getPosts,

  post: { posts }
}) => {
  const [search, updateSearch] = useState(" ");
  
 
 
  const onSubmit = e => {
    console.log(search)
    
  };

  const onChange = e => {
  
    
    updateSearch(e.target.value);
   
  };

  
  useEffect(() => {
     
    getPosts();
  }, [getPosts]);

  return (
   <div className="search-item">
            
         

           <div className="search-area">
                <input
                    name="search"
                    type="Search"
                    id="search"
                    placeholder="Search"
                     onChange={e => onChange(e)}
                    value={search}
                    
                />
                         
            <button className="input-btn" onClick={() => onSubmit()}>
                        <h4>Search</h4>  
                        <span className="button-bar"></span>  
            </button> 


           </div>
    </div>
  );
};

Search.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getPosts, getUserPosts })(
  withRouter(Search)
);
