import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [formPost, setPostData] = useState({
    title: "",
    body: "",
    location: "",
    type: ""
  });

  const { title, body, location, type } = formPost;

  const onChange = e => {
    setPostData({ ...formPost, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addPost(formPost);
    setPostData({
      title: "",
      body: "",
      location: "",
      type: ""
    });
  };

  return (
    <div className="post-template">
      <div className="post-popup">
        <h3>Make a post</h3>
      </div>
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        <div className="input-wrapper">
          <label htmlFor="type">Type</label>
          {/* Have to test select with onChange method */}
          {/* How to set default value with select? */}
          <select
            name="type"
            id="type"
            placeholder="Select Job"
            value={type}
            onChange={e => onChange(e)}
          >
            <option value="job">Job</option>
            <option value="general">General</option>
            <option value="other">other</option>
          </select>
        </div>

        <div className="input-wrapper">
          <label htmlFor="title">Title</label>

          {/* This will have to be broken down into street name, city name etc... next semester */}
          <input
            name="title"
            type="text"
            id="title"
            placeholder="Require Plumber"
            onChange={e => onChange(e)}
            value={title}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="location">Location</label>

          {/* This will have to be broken down into street name, city name etc... next semester */}
          <input
            name="location"
            type="text"
            id="location"
            placeholder="69 Street Ave"
            onChange={e => onChange(e)}
            value={location}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="description">Description</label>
          {/* Maybe not have this at all, have to think about it*/}
          <textarea
            row="10"
            col="80"
            name="body"
            type="text"
            id="body"
            value={body}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit.  "
            onChange={e => onChange(e)}
          >
            {body}
          </textarea>
        </div>
        <input type="submit" className="btn btn-dark my-1" value="Post" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
