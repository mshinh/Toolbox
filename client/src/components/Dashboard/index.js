import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import UserDash from "./UserDash";
import NavContainer from "./Nav";
import Spinner from "../Layout/Spinner";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Dashboard = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authComponents = [<Register key="0" />, <Login key="1" />];

  const userDash = [<UserDash key="0" />, <NavContainer key="1" />];

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Link className="header dash-item" to={`/`}>
        <h1>ToolBox</h1>
        <h3>Home</h3>
      </Link>
      <Search />
      {isAuthenticated ? userDash : authComponents}
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
