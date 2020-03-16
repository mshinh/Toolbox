import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";
import "./style.scss";

const NavContainer = ({ logout }) => {
  return (
    <div className="nav-container">
      <div className="nav-row">
        <div className="nav-item small">Messages</div>
       
        <Link to="/friends" className="nav-item small">
          <h3> Contacts </h3>
        </Link>
        
      
      </div>
      <div className="nav-row">
        <Link to="/account" className="nav-item small">
          <h3> Account Home </h3>
        </Link>
        <Link to="/notifications" className="nav-item small">
          <h3>Notifications </h3>
        </Link>
      </div>
      <div className="nav-row">
        <Link to="/profile" className="nav-item small">
          <h3>Profile</h3>
        </Link>

        <div className="nav-item small" onClick={logout}>
          Logout
        </div>
        {/* <div className="nav-item small">preferences</div> */}
      </div>
    </div>
  );
};

NavContainer.propTypes = {
  logout: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default connect(null, { logout })(NavContainer);

// return (
//   <div className="nav-container">
//     <div className="nav-row">
//       <div className="nav-item small">Messages</div>
//       <div className="nav-item small">Friends</div>
//     </div>
//     <div className="nav-row">
//       <Link to="/account" className="nav-item large">
//         <h3> Account Home </h3>
//       </Link>
//     </div>
//     <div className="nav-row">
//       {/* <Link to="/profile" className="nav-item small" ><h3> Profile </h3></Link>                */}
//       <Link to={`/profile/${isAuthenticated().user._id}`}>
//         <h3> Profile </h3>
//       </Link>
//       <div className="nav-item small" onClick={e => this.Logout(e)}>
//         Logout
//       </div>
//       {/* <div className="nav-item small">preferences</div> */}
//     </div>
//   </div>
// );

// export default Nav;
