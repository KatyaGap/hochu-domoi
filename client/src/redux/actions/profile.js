import { DELETE_PROFILEIMG, EDIT_PROFILEIMG } from '../constants/constants';

export const deleteProfileimg = (id) => ({
  type: DELETE_PROFILEIMG,
  payload: id,
});
export const editProfileimg = (id, body) => ({ type: EDIT_PROFILEIMG, payload: { id, body } });

export const deleteProfileimgThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/lk/avatar`, { method: 'delete' });
    const res = await response.json();
    console.log('res1', res);
    dispatch(deleteProfileimg(res));
  } catch (error) {
    console.log(error);
  }
};
export const editTaskThunk = (id, body) => async (dispatch) => {
  const response = await fetch(`/lk/avatar`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const result = await response.json();
    dispatch(editProfileimg(result));
  }
};
