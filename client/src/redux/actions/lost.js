import { GET_LOST } from "../type";
import axios from 'axios'

export const yaAction = (value) => ({
  type: GET_LOST,
  payload: value
})

export const yandexMap = (body) => (dispatch) => {
  axios.post('http://localhost:3002/map', body)
  .then((res) => dispatch(yaAction(res.data)))
  .catch((err) => console.log(err))
}

