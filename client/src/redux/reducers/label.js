import { GET_LABEL } from "../constants/constants";

const initialState = [];

const labelReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LABEL:
      return payload;
    default:
      return state;
  }
};
export default labelReducer;
