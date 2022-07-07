// import { GET_LOST } from "../constants/constants";

// const initialState = [];

<<<<<<< HEAD
// const lostReducer = (state = initialState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case GET_LOST:
//       return payload;
//     default:
//       return state;
//   }
// };
// export default lostReducer;
=======
const lostReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LOST:
      return payload;
    default:
      return state;
  }
};
export default lostReducer;
>>>>>>> 44a08321a69e55761ae374946acbbc30625cdff8
