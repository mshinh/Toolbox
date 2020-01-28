import React, { Component } from "react";
import "./style.scss";
//import locationImage from "../../../assets/images/one.jpg";


class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { title, body, name, location, imgCollection } = this.props.currPost;
    return (
      <div
        className={`post-content ${this.props.active ? "active" : "notActive"}`}
      >
        <div className="post-template">
          <h3>{name}</h3>
          <h1>{title}</h1>
          <p>{body}</p>
          <h2>Location</h2>
          <i class="lnr lnr-map-marker"></i><h4>{location}</h4>
          {/*
            imgCollection.map((img) => (
              <img src={window.location.origin + "/public/" + img} alt="image" />
            ))
            */}

            <br></br>
            <h2>Are you interested ?</h2>
                
            <button  className="input-btn">
                  <h4>Accept</h4>
                      <span className="button-bar"></span>
                

                </button>
                <button  className="input-btn">
                  <h4>Decline</h4>
                      <span className="button-bar"></span>
                

                </button>
                <br>
                </br>
                <br>
                </br>
                <button  className="input-btn">
                  <h4>Contact {name}</h4>
                      <span className="button-bar"></span>
                

                </button>
         

         

          

                </div>

        <div className="close-content" onClick={e => this.props.toggle(false)}>
          <h4>Close</h4>
        </div>
      </div>

    );
  }
}

export default Post;
