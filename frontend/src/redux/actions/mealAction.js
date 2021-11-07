import {
  MEAL_REQUEST,
  MEAL_SUCCESS,
  MEAL_FAIL,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_SUCCESS,
  MEAL_DETAILS_FAIL,
} from "redux/constants/mealConstants";
import mealApi from "components/api/mealApi";

//Fetch meal list
export const getMealList = () => async (dispacth) => {
  try {
    dispacth({ type: MEAL_REQUEST });

    const { data } = await mealApi.get("/api/meals");

    dispacth({ type: MEAL_SUCCESS, payload: data });
  } catch (err) {
    dispacth({
      type: MEAL_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//Fetch meal details
export const getMealDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_DETAILS_REQUEST });

    const { data } = await mealApi.get(`/api/meals/${id}`);

    dispatch({ type: MEAL_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: MEAL_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
