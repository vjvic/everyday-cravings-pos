import {
  CASHIER_ADD_ITEM,
  CASHIER_REMOVE_ITEM,
} from "../constants/cashierConstants";
import { mealApi } from "../../components";

//Add item to cashier
export const addToCashier = (id, qty) => async (dispatch, getState) => {
  const { data } = await mealApi.get(`/api/meals/${id}`);

  dispatch({
    type: CASHIER_ADD_ITEM,
    payload: {
      meal: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
};

//Remove item from cashier
export const removeFromCashier = (id) => (dispatch, getState) => {
  dispatch({
    type: CASHIER_REMOVE_ITEM,
    payload: id,
  });
};
