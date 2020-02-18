import axios from "axios";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  GET_ACCOUNT,
  ACCOUNT_ERROR,
  ACCOUNT_UPDATED,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_POSTPROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  ADD_CONTACT,
  DELETE_CONTACT
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Current User Account
export const getCurrentAccount = () => async dispatch => {
  try {
    const res = await axios.get("/api/users/me");

    dispatch({
      type: GET_ACCOUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all contacts
export const getFriends = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile/contacts");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    console.log(err)
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    
   // dispatch({
    //  type: PROFILE_ERROR,
     // payload: { msg: err.response.statusText, status: err.response.status }
   // });
  }
};

// Get post Interested
export const getPostProfiles = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/postUser/${userId}`);

    dispatch({
      type: GET_POSTPROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// // Get Github repos
// export const getGithubRepos = username => async dispatch => {
//   try {
//     const res = await axios.get(`/api/profile/github/${username}`);

//     dispatch({
//       type: GET_REPOS,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    history.push("/profile");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// update Account
export const updateAccount = (
  formData,
  history,
  edit = true
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("api/users/update", formData, config);

    dispatch({
      type: ACCOUNT_UPDATED,
      payload: res.data
    });

    dispatch(setAlert("Account Updated", "success"));

    history.push("/profile");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      dispatch(setAlert(errors[0].msg, "danger"));
    }

    dispatch({
      type: ACCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Contact from friends list
export const addContact = (
  formData
) => async dispatch => {
  console.log(formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("api/profile/addContact", JSON.stringify({contact: formData}), config);

    dispatch({
      type: ACCOUNT_UPDATED,
      payload: res.data
    });

    dispatch(setAlert("Account Updated", "success"));
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors;

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      dispatch(setAlert(errors[0].msg, "danger"));
    }

    dispatch({
      type: ACCOUNT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};




// Delete Contact
export const deleteContact = id => async dispatch => {
  console.log(id);
  try {

    const res = await axios.delete(`api/profile/deleteContact/${id}`);
    
    dispatch({
      type: ACCOUNT_UPDATED,
      paylod: res.data
    });

    dispatch(setAlert('Contact Removed', 'success'));
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors;

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      dispatch(setAlert(errors[0].msg, "danger"));
    }
    
    dispatch({
      type: ACCOUNT_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// upload photo
export const uploadProfilePhoto = profilePhoto => async dispatch => {
  const formData = new FormData();
  formData.append("photo", profilePhoto, profilePhoto.name);

  try {
    console.log(profilePhoto);
    const res = await axios.post("/api/profile/profilePhoto", formData);

    dispatch({
      type: ACCOUNT_UPDATED,
      payload: res.data
    });

    dispatch(loadUser());

    dispatch(setAlert("Profile photo uploaded", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Portfolio
export const addPortfolio = formData => async dispatch => {
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };

    const res = await axios.put("/api/profile/portfolio", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Portfolio Added", "success"));

    // history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit Portfolio with no new photos
export const editPortfolio = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    console.log(id);
    console.log("edit portfolio action");

    const res = await axios.put(
      `/api/profile/portfolio/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Portfolio Edited", "success"));

    // history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Edit Portfolio with new photos
export const editPortfolioNewPhotos = (id, formData) => async dispatch => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };

    console.log(id);
    console.log("edit portfolio action");

    const res = await axios.put(`/api/profile/portfolioPhoto/${id}`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Portfolio Edited", "success"));

    // history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete portfolio
export const deletePortfolio = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/portfolio/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Portfolio Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// // Add Education
// export const addEducation = (formData, history) => async dispatch => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };

//     const res = await axios.put('/api/profile/education', formData, config);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Education Added', 'success'));

//     history.push('/dashboard');
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// // Delete experience
// export const deleteExperience = id => async dispatch => {
//   try {
//     const res = await axios.delete(`/api/profile/experience/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Experience Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// // Delete education
// export const deleteEducation = id => async dispatch => {
//   try {
//     const res = await axios.delete(`/api/profile/education/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Education Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
