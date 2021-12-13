import { combineReducers } from "redux";
import {
  mealListReducer,
  mealDetailsReducer,
  mealDeleteReducer,
  mealCreateReducer,
  mealUpdateReducer,
} from "./mealReducers";
import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./userReducers";
import {
  orderListReducer,
  orderCreateReducer,
  orderDetailsReducer,
} from "./orderReducer";
import { cartReducer } from "./cartReducers";

const reducers = combineReducers({
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  mealDelete: mealDeleteReducer,
  mealCreate: mealCreateReducer,
  mealUpdate: mealUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

export default reducers;
