import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {signout} from '../../../actions/auth'
import { isAuthenticated } from "../../../actions/auth";
import "./style.scss";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  Logout = e => {
    if (e) {
      e.preventDefault();
    }
    //check if need to catch errors before changing the state of the logger
    // signout();

    this.props.logger();
  };

  render() {
    return (
      <div className="nav-container">
        <div className="nav-row">
          <div className="nav-item small">Messages</div>{" "}
          <div className="nav-item small">Friends</div>
        </div>
        <div className="nav-row">
          <Link to="/account" className="nav-item large">
            <h3> Account Home </h3>
          </Link>
        </div>
        <div className="nav-row">
          {/* <Link to="/profile" className="nav-item small" ><h3> Profile </h3></Link>                */}
          <Link to={`/profile/${isAuthenticated().user._id}`}>
            <h3> Profile </h3>
          </Link>
          <div className="nav-item small" onClick={e => this.Logout(e)}>
            Logout
          </div>
          {/* <div className="nav-item small">preferences</div> */}
        </div>
      </div>
    );
  }
}

export default Nav;
