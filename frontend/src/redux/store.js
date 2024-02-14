import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import authReducer from "./Auth/authReducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
