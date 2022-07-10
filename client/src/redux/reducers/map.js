import { GET_LOST, GET_LOST1 } from "../constants/constants";

const initialState = [];

const mapReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LOST:
      return [...state, payload];
    default:
      return state;
  }
};
export default mapReducer;
