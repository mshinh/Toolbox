import {
  SET_CONVERSATION_INFO,
  GET_CONVERSATION_INFO,
  GET_CONVERSATIONS_LIST,
  GET_SENT_CONVERSATIONS_LIST,
  GET_CONVERSATION_MESSAGES
} from "../actions/types";

const initialState = {
  conversation: [],
  conversationMessages: [],
  mailbox: [],
  mailboxSent: [],
  loading: true,
  messagesLoading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONVERSATION_INFO:
    case SET_CONVERSATION_INFO:
      return {
        ...state,
        conversation: payload,
        loading: false
        // messagesLoading: true
      };
    case GET_CONVERSATIONS_LIST:
      return {
        ...state,
        mailbox: payload,
        loading: false
      };
    case GET_SENT_CONVERSATIONS_LIST:
      return {
        ...state,
        mailboxSent: payload,
        loading: false
      };
    case GET_CONVERSATION_MESSAGES:
      return {
        ...state,
        conversationMessages: payload,
        messagesLoading: false
      };

    default:
      return state;
  }
}
