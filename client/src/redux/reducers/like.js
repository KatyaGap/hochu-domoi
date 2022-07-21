import { DELETE_LIKE, GET_LIKES, MAKE_LIKE } from '../constants/constants';

const initialState = [];
const likeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MAKE_LIKE:
      if (state.find((like) => like.post_id === payload.post_id)) {
        return [...state.filter((el) => el.post_id !== payload.post_id)];
      }
      return [...state, payload];
    case DELETE_LIKE:
      return state.filter((like) => like.post_id !== payload);
    case GET_LIKES:
      return payload;
    default:
      return state;
  }
};
export default likeReducer;
