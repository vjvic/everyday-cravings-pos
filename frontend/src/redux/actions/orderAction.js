import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
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
import { CART_RESET_ITEM } from "../constants/cartConstants";
import mealApi from "../../components/api/mealApi";
import { logout } from "./userActions";

/* export const getOrderList = () => async (dispacth, getState) => {
  try {
    dispacth({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get("api/orders", config);

    dispacth({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispacth({
      type: ORDER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createOrder = (orders) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.post(`/api/orders`, { ...orders }, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
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
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
 */

export const createOrder = (orders) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.post(`/api/orders`, { ...orders }, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_RESET_ITEM,
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
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getMyOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_MY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get(`/api/orders/myorders`, config);

    dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get("api/orders", config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateOrderToDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await mealApi.put(`/api/orders/${id}/deliver`, {}, config);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
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
      type: ORDER_DELIVER_FAIL,
      payload: message,
    });
  }
};

//For Cash on Delivery

export const updateOrderToPaid = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await mealApi.put(`/api/orders/${id}/pay`, {}, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
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
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

//Cashier

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
