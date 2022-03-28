import {
  ORDER_CASHIER_CREATE_FAIL,
  ORDER_CASHIER_CREATE_REQUEST,
  ORDER_CASHIER_CREATE_RESET,
  ORDER_CASHIER_CREATE_SUCCESS,
  ORDER_CASHIER_DETAILS_FAIL,
  ORDER_CASHIER_DETAILS_REQUEST,
  ORDER_CASHIER_DETAILS_RESET,
  ORDER_CASHIER_DETAILS_SUCCESS,
  ORDER_CASHIER_LIST_FAIL,
  ORDER_CASHIER_LIST_REQUEST,
  ORDER_CASHIER_LIST_SUCCESS,
} from "../constants/orderConstants";

//Cashier

export const orderCashierCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CASHIER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CASHIER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CASHIER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CASHIER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderCashierDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CASHIER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_CASHIER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_CASHIER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CASHIER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const orderCashierListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_CASHIER_LIST_REQUEST:
      return { loading: true };
    case ORDER_CASHIER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_CASHIER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
