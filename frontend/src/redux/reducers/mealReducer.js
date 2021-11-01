import {
  MEAL_REQUEST,
  MEAL_SUCCESS,
  MEAL_FAIL,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_SUCCESS,
  MEAL_DETAILS_FAIL,
} from "redux/constants/mealConstants";

export const mealListReducer = (state = { mealList: [] }, action) => {
  switch (action.type) {
    case MEAL_REQUEST:
      return { loading: true, meals: [] };
    case MEAL_SUCCESS:
      return { loading: false, meals: action.payload };
    case MEAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mealDetailsReducer = (
  state = { meal: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case MEAL_DETAILS_REQUEST:
      return { loading: true, ...state };
    case MEAL_DETAILS_SUCCESS:
      return { loading: false, meal: action.payload };
    case MEAL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
