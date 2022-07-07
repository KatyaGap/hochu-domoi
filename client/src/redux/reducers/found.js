import { GET_FOUND } from "../constants/constants";

const initialState = [];

const foundReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FOUND:
      return payload;
    default:
      return state;
  }
};
export default foundReducer;
