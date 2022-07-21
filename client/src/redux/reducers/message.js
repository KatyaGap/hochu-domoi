import { SEND_MESSAGE } from "../constants/constants";

const initialState = [];

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE:
      return payload;
    default:
      return state;
  }
};
export default messageReducer;
