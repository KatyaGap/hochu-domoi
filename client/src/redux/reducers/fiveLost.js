import { GET_FIVELOST } from "../constants/constants";

const initialState = [];

const fiveLostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FIVELOST:
      return payload;
    default:
      return state;
  }
};
export default fiveLostReducer;
