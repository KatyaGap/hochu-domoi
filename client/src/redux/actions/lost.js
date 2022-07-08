import axios from "axios";
import { GET_LOST } from "../constants/constants";

export const yaAction = (value) => ({
  type: GET_LOST,
  payload: value,
});

export const yandexMap = (body) => (dispatch) => {
  axios
    .post('http://localhost:3000/map/lost', body)
    .then((res) => dispatch(yaAction(...res.data)))
    .catch((err) => console.log(err));
};
