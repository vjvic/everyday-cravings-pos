import { combineReducers } from "redux";
import { mealListReducer, mealDetailsReducer } from "./mealReducer";

const reducers = combineReducers({
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
});

export default reducers;
