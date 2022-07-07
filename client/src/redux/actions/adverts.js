import { GET_ADVERTS, GET_FIVEFOUND, GET_FIVELOST } from '../constants/constants';

export const getAdverts = (data) => ({ type: GET_ADVERTS, payload: data });
export const getFiveLost = (data) => ({ type: GET_FIVELOST, payload: data });
export const getFiveFound = (data) => ({ type: GET_FIVEFOUND, payload: data });

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
