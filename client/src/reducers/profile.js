import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_ACCOUNT,
  GET_POSTPROFILE,
  ACCOUNT_ERROR,
  ACCOUNT_UPDATED,
  ADD_CONTACT,
  DELETE_CONTACT,
  ADD_NOTIFICATION
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  postProfile: null,
  postProfiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case ACCOUNT_UPDATED:
    case ADD_CONTACT:
    case DELETE_CONTACT:     
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

      case GET_POSTPROFILE:
        console.log("Get post profiles");
        console.log(payload);
        return {
          ...state,
          postProfiles: payload,
        };
    case ACCOUNT_ERROR:
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    default:
      return state;
  }
}
