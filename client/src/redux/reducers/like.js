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
      console.log('payload', payload);
      return state.filter((like) => like.post_id !== payload);
    case GET_LIKES:
      console.log('payload get likes', payload);
      // let lost = state.lost.find((el) => el.id === payload.id);
      // lost.name = lost.name;
      return payload;
    default:
      return state;
  }
};
export default likeReducer;
