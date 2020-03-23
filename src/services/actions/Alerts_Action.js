import { SHOW_ALERT, DELETE_ALERT } from "./types";

export const showAlert = (alert) => async (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
    payload: alert,
  });
};

export const deleteAlert = (alert) => async (dispatch) => {
  dispatch({
    type: DELETE_ALERT,
    payload: alert,
  });
};
