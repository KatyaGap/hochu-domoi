import axios from 'axios';
import { GET_LOST } from "../constants/constants";

export const yaAction = (value) => ({
  type: GET_LOST,
  payload: value,
});

export const yandexMap = (body) => (dispatch, { filter }) => {
  console.log('body', body);
  axios.post(`/map/${filter}`, body)
    .then((res) => {
      // console.log('res', res.data);
      dispatch(yaAction(res.data));
    })
    .catch((err) => console.log(err));
};
