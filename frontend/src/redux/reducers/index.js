import { combineReducers } from "redux";
import {
  mealListReducer,
  mealDetailsReducer,
  mealDeleteReducer,
  mealCreateReducer,
  mealUpdateReducer,
  mealCreateReviewsReducer,
} from "./mealReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
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
  mealCreateReviews: mealCreateReviewsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

export default reducers;
