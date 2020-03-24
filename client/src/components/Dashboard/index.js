import React, { Fragment, useState} from "react";
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

const Dashboard = ({ auth: { isAuthenticated, loading }, }) => {
  const authComponents = [<Register key="0" />, <Login key="1" />];

  const userDash = [<UserDash key="0" />, <NavContainer key="1" />];

  const [mobileMenu, toggleMenu] = useState(false);


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


      {/* <div className={`mobile-menu ${mobileMenu}`}>
         <Link to={'/'} className="mobile-home-btn">
           <h1>ToolBox</h1>
         </Link>
         <div className="toggle-menu" onClick={() => toggleMenu(!mobileMenu)}>
          
          <div className="close-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="33.991" viewBox="0 0 34 33.991">
              <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close" d="M32.314,28.284,44.457,16.141a2.845,2.845,0,0,0-4.024-4.024L28.29,24.26,16.146,12.117a2.845,2.845,0,1,0-4.024,4.024L24.266,28.284,12.122,40.428a2.845,2.845,0,1,0,4.024,4.024L28.29,32.308,40.433,44.452a2.845,2.845,0,1,0,4.024-4.024Z" transform="translate(-11.285 -11.289)"/>
            </svg>
          </div>

          <div className="open-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18">
              <path id="Icon_ionic-md-menu" data-name="Icon ionic-md-menu" d="M4.5,27h27V24H4.5Zm0-7.5h27v-3H4.5ZM4.5,9v3h27V9Z" transform="translate(-4.5 -9)"/>
            </svg>
          </div>

         </div>
      </div> */}
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
