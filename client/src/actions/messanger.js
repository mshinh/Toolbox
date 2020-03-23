import axios from "axios";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

import {
  SET_CONVERSATION_INFO,
  GET_CONVERSATION_INFO,
  CONVERSATION_ERROR
} from "./types";

// Get conversation information
export const setConversationRoom = data => async dispatch => {
  try {
    //const res = await axios.get("/api/profile/me");

    dispatch({
      type: SET_CONVERSATION_INFO,
      //payload: res.data
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CONVERSATION_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get conversation information
export const getConversationInfo = conversationId => async dispatch => {
  try {
    //const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_CONVERSATION_INFO,
      //payload: res.data
      payload: conversationId
    });
  } catch (err) {
    dispatch({
      type: CONVERSATION_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
