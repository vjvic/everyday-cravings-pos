import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Find the item in array
      //return true if the item is in array
      const existItem = state.cartItems.find((x) => x.meal === item.meal);

      if (existItem) {
        //check if the item exist in array
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.meal === existItem.meal ? item : x
          ),
        };
      } else {
        //Add the item in array if not exist
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.meal !== action.payload),
      };

    default:
      return state;
  }
};
