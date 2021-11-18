import { combineReducers } from "redux";
import { mealListReducer, mealDetailsReducer } from "./mealReducers";
import { cartReducer } from "./cartReducers";
import { userLoginReducer } from "./userReducers";
import { userRegisterReducer } from "./userReducers";
import { userDetailsReducer } from "./userReducers";
import { userListReducer } from "./userReducers";
import { userDeleteReducer } from "./userReducers";
import { userUpdateReducer } from "./userReducers";

const reducers = combineReducers({
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

export default reducers;
