import React, { Component, useState, useEffect } from "react";

import "./style.scss";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPostsSearch } from "./../../../actions/post";

const Search = ({
  getPostsSearch,

  post: { posts }
}) => {
  const [search, updateSearch] = useState("");

  const onSubmit = e => {
    console.log(search);
    getPostsSearch(search);
  };

  const onChange = e => {
    updateSearch(e.target.value);
  };

  useEffect(() => {}, [getPostsSearch]);

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
  getPostsSearch: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, { getPostsSearch })(withRouter(Search));
