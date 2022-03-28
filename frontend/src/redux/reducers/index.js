import { combineReducers } from "redux";
import {
  mealListReducer,
  mealDetailsReducer,
  mealDeleteReducer,
  mealCreateReducer,
  mealUpdateReducer,
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
  orderCashierCreateReducer,
  orderCashierListReducer,
  orderCashierDetailsReducer,
} from "./orderReducer";
import { cashierReducer } from "./cashierReducers";
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
  ingredientUpdateStockReducer,
} from "./ingredientReducer";
import {
  supplierListReducer,
  supplierDeleteReducer,
  supplierCreateReducer,
  supplierUpdateReducer,
  supplierDetailsReducer,
} from "./supplierReducer";

const reducers = combineReducers({
  //meals
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  mealDelete: mealDeleteReducer,
  mealCreate: mealCreateReducer,
  mealUpdate: mealUpdateReducer,
  mealUpdateStock: mealUpdateStockReducer,
//users
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
//categories
  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
//ingredients
  ingredientList: ingredientListReducer,
  ingredientUpdate: ingredientUpdateReducer,
  ingredientCreate: ingredientCreateReducer,
  ingredientDelete: ingredientDeleteReducer,
  ingredientDetails: ingredientDetailsReducer,
  ingredientItems: ingredientItemsReducer,
  ingredientUpdateStock: ingredientUpdateStockReducer,
//suppliers
  supplierList: supplierListReducer,
  supplierUpdate: supplierUpdateReducer,
  supplierCreate: supplierCreateReducer,
  supplierDelete: supplierDeleteReducer,
  supplierDetails: supplierDetailsReducer,
//cashier
  cashier: cashierReducer,
  orderCashierCreate: orderCashierCreateReducer,
  orderCashierList: orderCashierListReducer,
  orderCashierDetails: orderCashierDetailsReducer,
});

export default reducers;
