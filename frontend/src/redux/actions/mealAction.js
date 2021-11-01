import {
  MEAL_REQUEST,
  MEAL_SUCCESS,
  MEAL_FAIL,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_SUCCESS,
  MEAL_DETAILS_FAIL,
} from "redux/constants/mealConstants";
import axios from "axios";

export const getMealList = () => async (dispacth) => {
  try {
    dispacth({ type: MEAL_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/meals");

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

export const getMealDetails = (id) => async (dispacth) => {
  try {
    dispacth({ type: MEAL_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/api/meals/${id}`);

    dispacth({ type: MEAL_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispacth({
      type: MEAL_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
