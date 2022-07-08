// import { GET_LOST } from "../constants/constants";

import { GET_LOST } from "../constants/constants";

const initialState = [];


const lostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LOST:
      return [...state, payload];
    default:
      return state;
  }
};
export default lostReducer;
