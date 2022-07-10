import { GET_FILTERED } from "../constants/constants";

const initialState = [];

const filterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FILTERED:
      return payload;
    default:
      return state;
  }
};
export default filterReducer;
