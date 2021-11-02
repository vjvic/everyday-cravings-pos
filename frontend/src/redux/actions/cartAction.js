import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "redux/constants/cartConstants";
import mealApi from "components/api/mealApi";

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

  //Set cart item to local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Remove cart item action
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
