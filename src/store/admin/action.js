import axios from "axios";

import {
  CLEAR_LOGIN_ERROR,
  SET_ADMIN,
  SET_LOGIN_ERROR,
  UPDATE_PROFILE,
} from "./types";

export const login = (email, password) => (dispatch) => {
  dispatch({ type: CLEAR_LOGIN_ERROR });
  axios
    .post("/admin/login", { email, password })
    .then((res) => {
      dispatch({ type: SET_ADMIN, payload: res.data.token });
    })
    .catch(({ response }) => {
      if (response?.data.message) {
        dispatch({ type: SET_LOGIN_ERROR, payload: response.data.message });
      }
    });
};

export const getProfile = () => (dispatch) => {
  axios
    .get("/admin")
    .then((res) => {
      dispatch({ type: UPDATE_PROFILE, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const updateProfile = (profileData) => (dispatch) => {
  axios
    .patch("/admin", profileData)
    .then((res) => {
      dispatch({ type: UPDATE_PROFILE, payload: res.data.admin });
    })
    .catch((error) => {
      console.log(error);
    });
};
