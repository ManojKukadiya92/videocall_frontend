import axios from "axios";

import {
  GET_USER,
  BLOCK_UNBLOCK_USER,
  EDIT_USER_COIN,
  USER_RECHARGE_HISTORY,
  UPDATE_COIN_HISTORY,
  USER_CALL_HISTORY,
  GET_TOTAL_RECORD,
} from "./types";

export const getUser = (start, limit, startDate, endDate) => (dispatch) => {
  axios
    .get(
      `/user?start=${start}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
    )
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data.user });
      dispatch({ type: GET_TOTAL_RECORD, payload: res.data.total });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const blockUnblockUser = (id) => (dispatch) => {
  axios
    .get(`/user/block/${id}`)
    .then((res) => {
      dispatch({ type: BLOCK_UNBLOCK_USER, payload: res.data.user });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editCoin = (data, id) => (dispatch) => {
  axios
    .patch(`/user/${id}`, data)
    .then((res) => {
      dispatch({ type: EDIT_USER_COIN, payload: { data: res.data.user, id } });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const rechargeHistory = (id) => (dispatch) => {
  axios
    .get(`/recharge/history?user_id=${id}`)
    .then((res) => {
      dispatch({ type: USER_RECHARGE_HISTORY, payload: res.data.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

//when admin update coin then create recharge history
export const createUserHistory = (data) => (dispatch) => {
  axios
    .post(`/coin/purchase`, data)
    .then((res) => {
      dispatch({ type: UPDATE_COIN_HISTORY, payload: res.data.status });
    })
    .catch((error) => {
      console.log(error);
    });
};

//user call History
export const callHistory = (id) => (dispatch) => {
  axios
    .get(`/coin/outgoing?user_id=${id}`)
    .then((res) => {
      dispatch({ type: USER_CALL_HISTORY, payload: res.data.data });
    })
    .catch((error) => {
      console.log(error);
    });
};
