import { GET_LOST, DELETE_LOST, EDIT_LOST } from "../constants/constants";

const initialState = [];

const lostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LOST:
      return [...state, payload];
    case DELETE_LOST:
      return state.filter((post) => post.id !== payload);
    case EDIT_LOST:
      return { ...state };
    default:
      return state;
  }
};
export default lostReducer;
