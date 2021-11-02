import { combineReducers } from "redux";
import { mealListReducer, mealDetailsReducer } from "./mealReducer";
import { cartReducer } from "./cartReducer";

const reducers = combineReducers({
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  cart: cartReducer,
});

export default reducers;
