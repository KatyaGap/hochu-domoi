import axios from 'axios';
import { GET_LABEL } from "../constants/constants";

export const getLabel = (value) => ({
  type: GET_LABEL,
  payload: value,
});

export const labelMap = (filter) => (dispatch) => {
  axios(`/map/${filter}`)
    .then((res) => {
      // console.log('res', res.data);
      dispatch(getLabel(res.data));
    })
    .catch((err) => console.log(err));
};
