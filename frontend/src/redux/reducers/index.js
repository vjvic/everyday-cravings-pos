import { combineReducers } from "redux";
import {
  mealListReducer,
  mealDetailsReducer,
  mealDeleteReducer,
  mealCreateReducer,
  mealUpdateReducer,
  mealCreateReviewsReducer,
  mealCategoryReducer,
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
  mealCategory: mealCategoryReducer,
  mealDetails: mealDetailsReducer,
  mealDelete: mealDeleteReducer,
  mealCreate: mealCreateReducer,
  mealUpdate: mealUpdateReducer,
  mealCreateReviews: mealCreateReviewsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

export default reducers;
