import {
  DELETE_PROFILEIMG,
  EDIT_PROFILEIMG,
  GET_PROFILE,
} from '../constants/constants';

const initialState = [];

const paramsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return payload;
    case DELETE_PROFILEIMG:
      return state.map((profile) => {
        if (profile.id === payload.id) {
          profile.user_photo = null;
          return profile;
        }
        return profile;
      });
    case EDIT_PROFILEIMG:
      return state.map((profile) => profile.id === payload.id ? payload : profile);
    default:
      return state;
  }
};
export default paramsReducer;
