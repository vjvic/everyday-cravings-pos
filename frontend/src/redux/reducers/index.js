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
  mealUpdateStockReducer,
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
  orderCreateReducer,
  orderDetailsReducer,
  orderMyListReducer,
  orderListReducer,
  orderUpdateToDeliveredReducer,
  orderUpdateToPaidReducer,
  orderCashierCreateReducer,
  orderCashierListReducer,
  orderCashierDetailsReducer,
} from "./orderReducer";
import {
  cartReducer,
  cartAddressReducer,
  cartPaymentMethodReducer,
} from "./cartReducers";
import {
  categoryListReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
  categoryDetailsReducer,
} from "./categoryReducers";
import {
  ingredientListReducer,
  ingredientDeleteReducer,
  ingredientCreateReducer,
  ingredientUpdateReducer,
  ingredientDetailsReducer,
  ingredientItemsReducer,
} from "./ingredientReducer";
import {
  supplierListReducer,
  supplierDeleteReducer,
  supplierCreateReducer,
  supplierUpdateReducer,
  supplierDetailsReducer,
} from "./supplierReducer";

const reducers = combineReducers({
  mealList: mealListReducer,
  mealCategory: mealCategoryReducer,
  mealDetails: mealDetailsReducer,
  mealDelete: mealDeleteReducer,
  mealCreate: mealCreateReducer,
  mealUpdate: mealUpdateReducer,
  mealCreateReviews: mealCreateReviewsReducer,
  mealTop: mealTopListReducer,
  mealUpdateStock: mealUpdateStockReducer,

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
  orderDetails: orderDetailsReducer,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer,
  orderUpdateToDelivered: orderUpdateToDeliveredReducer,
  orderUpdateToPaid: orderUpdateToPaidReducer,
  orderCashierCreate: orderCashierCreateReducer,
  orderCashierList: orderCashierListReducer,
  orderCashierDetails: orderCashierDetailsReducer,

  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,

  ingredientList: ingredientListReducer,
  ingredientUpdate: ingredientUpdateReducer,
  ingredientCreate: ingredientCreateReducer,
  ingredientDelete: ingredientDeleteReducer,
  ingredientDetails: ingredientDetailsReducer,
  ingredientItems: ingredientItemsReducer,

  supplierList: supplierListReducer,
  supplierUpdate: supplierUpdateReducer,
  supplierCreate: supplierCreateReducer,
  supplierDelete: supplierDeleteReducer,
  supplierDetails: supplierDetailsReducer,
});

export default reducers;
