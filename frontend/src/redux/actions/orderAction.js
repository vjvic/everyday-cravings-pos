import {

  ORDER_CASHIER_CREATE_REQUEST,
  ORDER_CASHIER_CREATE_SUCCESS,
  ORDER_CASHIER_CREATE_FAIL,
  ORDER_CASHIER_LIST_REQUEST,
  ORDER_CASHIER_LIST_SUCCESS,
  ORDER_CASHIER_LIST_FAIL,
  ORDER_CASHIER_DETAILS_REQUEST,
  ORDER_CASHIER_DETAILS_SUCCESS,
  ORDER_CASHIER_DETAILS_FAIL,
} from "../constants/orderConstants";
import mealApi from "../../components/api/mealApi";
import { logout } from "./userActions";


//Cashier

//Create new order from cashier
export const createOrderCashier = (orders) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CASHIER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.post(
      `/api/orders/cashier`,
      { ...orders },
      config
    );

    dispatch({
      type: ORDER_CASHIER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CASHIER_CREATE_FAIL,
      payload: message,
    });
  }
};

//Get all orders 
export const getOrderCashierList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CASHIER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get("api/orders/cashier", config);

    dispatch({ type: ORDER_CASHIER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_CASHIER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//Get order details
export const getOrderCashierDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CASHIER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get(`/api/orders/cashier/${id}`, config);

    dispatch({ type: ORDER_CASHIER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_CASHIER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
