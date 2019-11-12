import React, { Component } from "react";
import "./style.scss";
import { isAuthenticated } from "../../../actions/auth";
import userImage from "../../../assets/images/f_trades.jpg";

class UserDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      redirectToSignin: false,
      error: ""
    };
  }

  componentDidMount() {
    // console.log("user id from route params: ", isAuthenticated().user._id)
    const userId = isAuthenticated().user._id;
    fetch("http://localhost:8000/profile/${userId}");
  }

  render() {
    return (
      <div className="user-item">
        <div
          className="user-picture"
          style={{ backgroundImage: `url(${userImage})` }}
        ></div>
        <div className="user-detail">
          <h3>
            {/* Have to put the user name here */}
            Hello {isAuthenticated().user.fname} !
          </h3>
        </div>
      </div>
    );
  }
}

export default UserDash;
