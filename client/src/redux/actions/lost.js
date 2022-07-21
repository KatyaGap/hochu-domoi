import axios from 'axios';
import { GET_LOST, DELETE_LOST } from "../constants/constants";

export const yaAction = (value) => ({
  type: GET_LOST,
  payload: value,
});
export const deleteLost = (id) => ({
  type: DELETE_LOST,
  payload: id,
});

export const yandexMap = (body) => (dispatch, { filter }) => {
  console.log('body', body);
  axios.post(`/map/${filter}`, body)
    .then((res) => {
      dispatch(yaAction(res.data));
    })
    .catch((err) => console.log(err));
};
