import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import ProfileActions from "./ProfileActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const UserProfile = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <ProfileActions />
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  UserProfile
);

//     render() {

//         const {fname,lname,email,password,error,open,dob,gender,location,phone,occupation,website, bio} = this.state;
//         return(<div>
//             <form className="addBarForm" autoComplete="off" >
//             <div className="form-wrapper">
//               <div className="form-row">
//                   <fieldset className="form-column" id='meta-form'>
//                     <h2 className="input-heading">Update Account</h2>

//                     <div className="alert alert-danger" style={{display: error ? "": "none"}}>{error}</div>

//                     <div className="alert alert-info" style={{display: open ? "": "none"}}>

//                     </div>

//                     <div className="input-row">
//                       <div className="input-wrapper">
//                         <label htmlFor="fname">First Name</label>
//                         {/* defaultValue= {repEmail} */}
//                         <input name="fname" type="text" id="fname" placeholder="John" onChange={this.onChange}   defaultValue={fname}/>
//                       </div>

//                       <div className="input-wrapper">
//                           <label htmlFor="lname">Last Name</label>
//                           <input name="lname" type="text" id="lname" placeholder="Smith" onChange={this.onChange} defaultValue={lname} />
//                       </div>
//                     </div>

//                     <div className="input-row">
//                       <div className="input-wrapper">
//                         <label htmlFor="email">Email</label>
//                         <input name="email" type="email" id="email" placeholder="hello@toolbox.com" onChange={this.onChange} defaultValue={email} />
//                       </div>

//                       <div className="input-wrapper">
//                           <label htmlFor="password">Update Password</label>
//                           <input name="password" type="password" id="password" placeholder="" onChange={this.onChange} defaultValue={password} />
//                       </div>
//                     </div>

//                     <h2 className="input-heading">Update Profile</h2>

//                     <div className="input-row">
//                       <div className="input-wrapper">
//                         <label htmlFor="dob">Date Of Birth</label>
//                         {/* Have to check to see if state is being updated with type date */}
//                         {/* defaultValue={dob} */}
//                         <input name="dob" type="date" id="dob" placeholder="" onChange={this.onChange}  />
//                       </div>

//                       <div className="input-wrapper">
//                           <label htmlFor="gender">Gender</label>
//                           {/* Have to test select with onChange method */}
//                           {/* How to set default value with select? */}
//                           <select name="gender" id="gender" placeholder="" onChange={this.onChange} >
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">other</option>
//                           </select>
//                       </div>
//                     </div>

//                     <div className="input-row">
//                       <div className="input-wrapper">
//                         <label htmlFor="location">Location</label>
//                         {/* This will have to be broken down into street name, city name etc... next semester */}
//                         <input name="location" type="text" id="location" placeholder="69 Street Ave" onChange={this.onChange} defaultValue={location} />
//                       </div>

//                       <div className="input-wrapper">
//                           <label htmlFor="phone">Phone</label>
//                           <input name="phone" type="text" id="phone" placeholder="" onChange={this.onChange} defaultValue={phone} />
//                       </div>
//                     </div>

//                     <div className="input-row">
//                       <div className="input-wrapper">
//                         <label htmlFor="occupation">Occupation</label>
//                         {/* We have to expand on this, people can have multiple occupations and we should standardize for searching purposes*/}
//                         <input name="occupation" type="text" id="occupation" placeholder="Stone Worker" onChange={this.onChange} defaultValue={occupation} />
//                       </div>

//                       <div className="input-wrapper">
//                           <label htmlFor="website">Website</label>
//                           {/* Maybe not have this at all, have to think about it*/}
//                           <input name="website" type="text" id="website" placeholder="www.mysite.com" onChange={this.onChange} defaultValue={website} />
//                       </div>
//                     </div>

//                     <div className="input-row">
//                       <div className="input-wrapper">
//                           <label htmlFor="bio">Bio</label>
//                           {/* Maybe not have this at all, have to think about it*/}
//                           <textarea row="10" col="80" name="bio" type="text" id="bio" onChange={this.onChange}  >
//                             {bio}
//                           </textarea>
//                       </div>
//                     </div>

//                   </fieldset>

//                 </div>
//                 <button type='submit' className="input-btn" onClick={this.onSubmit}>
//                     <h4>Update</h4>
//                     <span className="button-bar"></span>
//                   </button>
//               </div>
//             </form>
//         </div>);
//     }
// }

// export default Profile
