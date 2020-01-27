import React, { Component } from "react";
import "./style.scss";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, body, name } = this.props.currPost;
    return (
      <div
        className={`post-content ${this.props.active ? "active" : "notActive"}`}
      >
        <div className="post-template">
          <h3>{name}</h3>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
        <div className="close-content" onClick={e => this.props.toggle(false)}>
          <h4>Close</h4>
        </div>
      </div>
    );
  }
}

export default Post;
