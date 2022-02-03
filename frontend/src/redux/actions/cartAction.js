import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import { setItemToLcalStorage } from "../../utils/utils";
import { mealApi } from "../../components";

//Add to cart action
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await mealApi.get(`/api/meals/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
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

//Remove cart item action
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

  //Save shipping address to local storage
  setItemToLcalStorage("shippingAddress", data);
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });

  //Save payment method to local storage
  setItemToLcalStorage("paymentMethod", data);
};
