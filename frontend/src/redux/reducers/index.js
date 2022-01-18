import { combineReducers } from "redux";
import {
  mealListReducer,
  mealDetailsReducer,
  mealDeleteReducer,
  mealCreateReducer,
  mealUpdateReducer,
  mealCreateReviewsReducer,
  mealCategoryReducer,
  mealTopListReducer,
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
import { orderCreateReducer } from "./orderReducer";
import {
  cartReducer,
  cartAddressReducer,
  cartPaymentMethodReducer,
} from "./cartReducers";

const reducers = combineReducers({
  mealList: mealListReducer,
  mealCategory: mealCategoryReducer,
  mealDetails: mealDetailsReducer,
  mealDelete: mealDeleteReducer,
  mealCreate: mealCreateReducer,
  mealUpdate: mealUpdateReducer,
  mealCreateReviews: mealCreateReviewsReducer,
  mealTop: mealTopListReducer,
  cart: cartReducer,
  cartPaymentMethod: cartPaymentMethodReducer,
  cartAddress: cartAddressReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
});

export default reducers;
