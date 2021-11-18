import { combineReducers } from "redux";
import { mealListReducer, mealDetailsReducer } from "./mealReducers";
import { cartReducer } from "./cartReducers";
import { userLoginReducer } from "./userReducers";
import { userRegisterReducer } from "./userReducers";
import { userListReducer } from "./userReducers";
import { userDeleteReducer } from "./userReducers";

const reducers = combineReducers({
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

export default reducers;
