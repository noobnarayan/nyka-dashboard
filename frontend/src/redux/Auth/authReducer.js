import * as actionTypes from "./actionType";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        error: null,
      };
    case actionTypes.LOGIN_ERROR:
    case actionTypes.SIGNUP_ERROR:
    case actionTypes.GET_CURRENT_USER_ERROR:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.error,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
