import { SET_CONVERSATION_INFO, GET_CONVERSATION_INFO } from "../actions/types";

const initialState = {
  conversation: [],
  loading: true,
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
      };

    default:
      return state;
  }
}
