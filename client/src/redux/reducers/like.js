import { DELETE_LIKE, GET_LIKES, MAKE_LIKE } from "../constants/constants";
const initialState = [];
const likeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MAKE_LIKE:
			if (state.findIndex((post) => post.id === payload.id) > 0) {
				console.log('aaaaaa', state.filter((el) => el.id !== payload.id))
				return state?.filter((el) => el.id !== payload.id);
			}
      return [...state, payload]
    case DELETE_LIKE:
      return state.filter((post) => post.id !== payload);
    case GET_LIKES:
      console.log(payload);
      // let lost = state.lost.find((el) => el.id === payload.id);
      // lost.name = lost.name;
      return [...state, payload];
    default:
      return state;
  }
};
export default likeReducer;
