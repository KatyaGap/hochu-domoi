
import { GET_FIVEFOUND } from "../constants/constants";

const initialState = [];

const fiveFoundReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FIVELOST:
      return payload;
    default:
      return state;
  }
};
export default fiveFoundReducer;
