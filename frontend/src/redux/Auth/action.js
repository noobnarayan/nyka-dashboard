import { authService } from "../../services/authService";
import * as actionTypes from "./actionType";

export const loginSuccess = (user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user,
  };
};

export const loginError = (error) => {
  return {
    type: actionTypes.LOGIN_ERROR,
    error,
  };
};

export const signupSuccess = (user) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    user,
  };
};

export const signupError = (error) => {
  return {
    type: actionTypes.SIGNUP_ERROR,
    error,
  };
};

export const getCurrentUserSuccess = (user) => {
  return {
    type: actionTypes.GET_CURRENT_USER_SUCCESS,
    user,
  };
};

export const getCurrentUserError = (error) => {
  return {
    type: actionTypes.GET_CURRENT_USER_ERROR,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await authService.login(data);
    dispatch(loginSuccess(res.user));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};
export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await authService.getCurrentUser();
    dispatch(getCurrentUserSuccess(res.user));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};
