import {
  CASHIER_ADD_ITEM,
  CASHIER_REMOVE_ITEM,
  CASHIER_RESET_ITEM,
} from "../constants/cashierConstants";

export const cashierReducer = (state = { cashierItems: [] }, action) => {
  switch (action.type) {
    case CASHIER_ADD_ITEM:
      const item = action.payload;

      // Find the item in array
      //return true if the item is in array
      const existItem = state.cashierItems.find((x) => x.meal === item.meal);

      if (existItem) {
        //check if the item exist in array
        return {
          ...state,
          cashierItems: state.cashierItems.map((x) =>
            x.meal === existItem.meal ? item : x
          ),
        };
      } else {
        //Add the item in array if not exist
        return {
          ...state,
          cashierItems: [...state.cashierItems, item],
        };
      }
    case CASHIER_REMOVE_ITEM:
      return {
        ...state,
        cashierItems: state.cashierItems.filter(
          (x) => x.meal !== action.payload
        ),
      };
    case CASHIER_RESET_ITEM:
      return { cashierItems: [] };

    default:
      return state;
  }
};
