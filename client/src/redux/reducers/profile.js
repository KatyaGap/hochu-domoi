import { DELETE_PROFILEPOST, GET_PROFILE } from '../constants/constants';

const initialState = [];

const paramsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return payload;
    case DELETE_PROFILEPOST:
      return state.filter((post) => post.id !== payload);
    default:
      return state;
  }
};
export default paramsReducer;
