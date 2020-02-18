import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../../actions/post";

import "./style.scss";

const PostForm = ({ addPost }) => {
  const [formPost, setPostData] = useState({
    tags: "",
    title: "",
    body: "",
    location: "",
    type: "",
    imgCollection: null
  });

  
  const [active, activeToggle] = useState(false)


  const { title, body, location, type, imgCollection, tags } = formPost;

  const onChange = e => {
    setPostData({ ...formPost, [e.target.name]: e.target.value });
  };
  
  
  const onFileChange = e => {
    setPostData({ ...formPost, imgCollection: e.target.files });
  };



  const onSubmit = e => {
    e.preventDefault();

    var formData = new FormData();
    for (var x = 0; x < imgCollection.length; x++) {
      formData.append("imgCollection", imgCollection[x]);
    }

    var tagsArray = tags.split(",");

   

    for (let i = 0; i < tagsArray.length; i++) {
      formData.append("tags", tagsArray[i]);
    }
 
    formData.append("postStatus", "active")
    formData.append("title", title);
    formData.append("body", body);
    formData.append("location", location);
    formData.append("type", type);
    addPost(formData);
    setPostData({
      title: "",
      body: "",
      location: "",
      type: "job",
      imgCollection: null
    });
  };

  return (
    <div className={`post-form-container ${active ? "active" : "notActive"}`}>
   
               
        <button className="input-btn" onClick={() => activeToggle(!active)}>
                    <h4>Toggle Post Creator</h4>  
                    <span className="button-bar"></span>  
          </button> 

      
            
    <form className="addBarForm" onSubmit={e => onSubmit(e)}>
    <div className="form-wrapper">
        <div className="form-row">
           
       

        <fieldset className="form-column" id='meta-form'>
        <h2 className="input-heading">Create A Post</h2>
          <div className="input-row">
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
              <label htmlFor="tags">Tags (seperate with " , ")</label>

              {/* This will have to be broken down into street name, city name etc... next semester */}
              <input
                name="tags"
                type="text"
                id="tags"
                placeholder="plumber,mason"
                onChange={e => onChange(e)}
                value={tags}
              />
            </div>
       

          </div>
          <div className="input-row">
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
          </div>
          <div className="form-group">
                <input
                  type="file"
                  name="imgCollection"
                  onChange={e => onFileChange(e)}
                  multiple
                />
              </div>
          <div className="input-row">
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
          </div>
          <div className="input-row">
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
          </div>
          

          </fieldset>
        </div>
{/*         
        <button type='submit' className="input-btn" onClick={this.onSubmit}>
                    <h4>Submit Post</h4>  
                    <span className="button-bar"></span>  
          </button> */}


          <input type="submit" className="btn btn-dark my-1" value="Post" />
          
      </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
