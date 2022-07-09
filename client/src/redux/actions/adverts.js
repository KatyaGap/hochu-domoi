import axios from 'axios';

import { GET_ADVERTS, GET_FIVEFOUND, GET_FIVELOST, GET_FOUND, GET_LOST } from '../constants/constants';

export const getAdverts = (data) => ({ type: GET_ADVERTS, payload: data });
export const getFiveLost = (data) => ({ type: GET_FIVELOST, payload: data });
export const getFiveFound = (data) => ({ type: GET_FIVEFOUND, payload: data });
export const getLost = (data) => ({ type: GET_LOST, payload: data });
export const getFound = (data) => ({ type: GET_FOUND, payload: data });

export const getAdvertsThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/adverts');
    const result = await response.json();
    dispatch(getAdverts(result));
  } catch (error) {
    console.log(error);
  }
};

export const getFiveLostThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/adverts/fiveLost');
    const result = await response.json();
    dispatch(getFiveLost(result));
  } catch (error) {
    console.log(error);
  }
};

export const getFiveFoundThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/adverts/fiveFound');
    const result = await response.json();
    dispatch(getFiveFound(result));
  } catch (error) {
    console.log(error);
  }
};

// export const getLostThunk = () => async (dispatch) => {
//   try {
//     const response = await fetch('/map/lost');
//     const result = await response.json();
//     console.log('getlost', result);
//     dispatch(getLost(result));
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getFoundThunk = () => async (dispatch) => {
//   try {
//     const response = await fetch('/map/found');
//     const result = await response.json();
//     console.log('getfound', result);
//     dispatch(getFound(result));
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const yaAction = (value) => ({
//   type: GET_LOST,
//   payload: value,
// })

// export const yandexMap = (body) => (dispatch) => {
//   axios.post('http://localhost:3002/map', body)
//     .then((res) => dispatch(yaAction(res.data)))
//     .catch((err) => console.log(err));
// };
