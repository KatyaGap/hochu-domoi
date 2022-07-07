const initialState = [];

const advertsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ADVERTS:
      return payload;
    default:
      return state;
  }
};
export default advertsReducer;
