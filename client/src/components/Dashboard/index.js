import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import UserDash from "./UserDash";
import NavContainer from "./Nav";
import Alert from "../Layout/Alert";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Dashboard = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authComponents = [<Register />, <Login />];

  const userDash = [<UserDash />, <NavContainer />];

  return (
    <div>
      <Link className="header dash-item" to={`/`}>
        <h1>ToolBox</h1>
        <h3>Home</h3>
      </Link>
      <Search />
      <Alert />
      {/* {!loading && (
        <Fragment>{isAuthenticated ? authComponents : userDash}</Fragment>
      )} */}
      <Fragment>{isAuthenticated ? userDash : authComponents}</Fragment>
    </div>
  );
};

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Dashboard);
