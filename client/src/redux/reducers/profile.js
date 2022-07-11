import { GET_PROFILE } from "../constants/constants";

const initialState = [];

const paramsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return payload;
    default:
      return state;
  }
};
export default paramsReducer;
