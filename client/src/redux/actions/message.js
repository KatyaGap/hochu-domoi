import { SEND_MESSAGE } from '../constants/constants';

export const sendMessage = (data) => ({ type: SEND_MESSAGE, payload: data });

export const sendMessageThunk = (body, id) => async (dispatch) => {
  const response = await fetch(`/message/${id}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ body }),
  });
  if (response.ok) {
    const result = await response.json();
    dispatch(sendMessage(result));
  }
};
