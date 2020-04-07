import axios from "axios";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

import {
  SET_CONVERSATION_INFO,
  GET_CONVERSATION_INFO,
  GET_CONVERSATIONS_LIST,
  GET_SENT_CONVERSATIONS_LIST,
  GET_CONVERSATION_MESSAGES,
  CONVERSATION_ERROR,
  INBOX_ERROR,
  MESSAGES_ERROR
} from "./types";

export const getInboxMail = () => async dispatch => {
  try {
    const res = await axios.get("/api/mailbox/inbox");

    console.log(res);

    dispatch({
      type: GET_CONVERSATIONS_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INBOX_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getSentMail = () => async dispatch => {
  try {
    const res = await axios.get("/api/mailbox/sent");

    console.log(res);

    dispatch({
      type: GET_SENT_CONVERSATIONS_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INBOX_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getMessages = conversationId => async dispatch => {
  try {
    const res = await axios.get(`/api/mailbox/inbox/${conversationId}`);

    console.log("Actions");
    console.log(res);

    dispatch({
      type: GET_CONVERSATION_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Mail
export const deleteMail = id => async dispatch => {
  try {
    console.log("Action delete");
    const res = await axios.delete(`/api/mailbox/inbox/${id}`);

    dispatch({
      type: GET_CONVERSATIONS_LIST,
      payload: res.data
    });

    dispatch(setAlert("Message Removed", "success"));
  } catch (err) {
    dispatch({
      type: MESSAGES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get conversation information
export const setConversationRoom = data => async dispatch => {
  try {
    //const res = await axios.get("/api/profile/me");

    dispatch({
      type: SET_CONVERSATION_INFO,
      //payload: res.data
      payload: data
    });

    dispatch(getMessages(data.id));
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
