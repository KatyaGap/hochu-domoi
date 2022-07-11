import axios from 'axios';

import { GET_ADVERTS, GET_FILTERED, GET_FIVEFOUND, GET_FIVELOST, GET_FOUND, GET_LOST, GET_PARAMS, GET_PROFILE } from '../constants/constants';

export const getAdverts = (data) => ({ type: GET_ADVERTS, payload: data });
export const getFiveLost = (data) => ({ type: GET_FIVELOST, payload: data });
export const getFiveFound = (data) => ({ type: GET_FIVEFOUND, payload: data });
export const getLost = (data) => ({ type: GET_LOST, payload: data });
export const getFound = (data) => ({ type: GET_FOUND, payload: data });
export const getFiltered = (data) => ({ type: GET_FILTERED, payload: data });
export const getParams = (data) => ({ type: GET_PARAMS, payload: data });
export const getProfile = (data) => ({ type: GET_PROFILE, payload: data });

export const getAdvertsThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/adverts');
    const result = await response.json();
    dispatch(getAdverts(result));
  } catch (error) {
    console.log(error);
  }
};

export const getProfileThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/lk');
    const result = await response.json();
    dispatch(getProfile(result));
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
export const getFilteredThunk = (body) => async (dispatch) => {
  const response = await fetch('/adverts/filter', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const result = await response.json();
    dispatch(getFiltered(result));
  }
};
export const getParamsThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/adverts/params');
    const result = await response.json();
    dispatch(getParams(result));
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
