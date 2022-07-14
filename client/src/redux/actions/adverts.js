import axios from 'axios';

import {
  DELETE_LIKE,
  DELETE_PROFILEPOST,
  GET_ADVERTS,
  GET_FILTERED,
  GET_FIVEFOUND,
  GET_FIVELOST,
  GET_FOUND,
  GET_LIKES,
  GET_LOST,
  GET_PARAMS,
  GET_PROFILE,
  MAKE_LIKE,
} from '../constants/constants';

export const getAdverts = (data) => ({ type: GET_ADVERTS, payload: data });
export const getFiveLost = (data) => ({ type: GET_FIVELOST, payload: data });
export const getFiveFound = (data) => ({ type: GET_FIVEFOUND, payload: data });
export const getLost = (data) => ({ type: GET_LOST, payload: data });
export const getFound = (data) => ({ type: GET_FOUND, payload: data });
export const getFiltered = (data) => ({ type: GET_FILTERED, payload: data });
export const getParams = (data) => ({ type: GET_PARAMS, payload: data });
export const getProfile = (data) => ({ type: GET_PROFILE, payload: data });
export const deleteProfilePost = (id) => ({
  type: DELETE_PROFILEPOST,
  payload: id,
});
export const makeLike = (data) => ({ type: MAKE_LIKE, payload: data });
export const deleteLike = (id) => ({ type: DELETE_LIKE, payload: id });
export const getLikes = (data) => ({ type: GET_LIKES, payload: data });

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
    console.log('result profile', result);
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
export const deleteProfilePostThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/lk/${id}`, { method: 'delete' });
    const result = await response.json();
    console.log('result', result);
    if (response.ok) {
      console.log(response);
      dispatch(deleteProfilePost(id));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getLikesThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/lk/likes');
    const result = await response.json();
    dispatch(getLikes(result));
  } catch (error) {
    console.log(error);
  }
};
export const deleteLikeThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/lk/likes/${id}`, { method: 'delete' });
    if (response.status === 200) {
      dispatch(deleteLike(id));
    }
  } catch (error) {
    console.log(error);
  }
};
export const makeLikeThunk = (obj) => async (dispatch) => {
  try {
    const response = await fetch(`/lk/likes/${obj.id}`);
    if (response.ok) {
      const result = await response.json();
      dispatch(makeLike(result));
    }
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
