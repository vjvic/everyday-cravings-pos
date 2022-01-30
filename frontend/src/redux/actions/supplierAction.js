import {
  SUPPLIER_CREATE_FAIL,
  SUPPLIER_CREATE_REQUEST,
  SUPPLIER_CREATE_SUCCESS,
  SUPPLIER_DELETE_FAIL,
  SUPPLIER_DELETE_REQUEST,
  SUPPLIER_DELETE_SUCCESS,
  SUPPLIER_FAIL,
  SUPPLIER_REQUEST,
  SUPPLIER_SUCCESS,
  SUPPLIER_UPDATE_FAIL,
  SUPPLIER_UPDATE_REQUEST,
  SUPPLIER_UPDATE_SUCCESS,
} from "../constants/supplierConstants";
import { mealApi } from "../../components";
import { logout } from "./userActions";

export const createSupplier = (supplier) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_CREATE_REQUEST,
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
      `/api/supplier`,
      { ...supplier },
      config
    );

    dispatch({
      type: SUPPLIER_CREATE_SUCCESS,
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
      type: SUPPLIER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteSupplier = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await mealApi.delete(`/api/supplier/${id}`, config);

    dispatch({
      type: SUPPLIER_DELETE_SUCCESS,
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
      type: SUPPLIER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateSupplier = (supplier) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_UPDATE_REQUEST,
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

    const { data } = await mealApi.put(
      `/api/supplier/${supplier._id}`,
      { ...supplier },
      config
    );

    dispatch({
      type: SUPPLIER_UPDATE_SUCCESS,
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
      type: SUPPLIER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getSupplierList = () => async (dispatch) => {
  try {
    dispatch({ type: SUPPLIER_REQUEST });
    const { data } = await mealApi.get(`/api/supplier`);

    dispatch({ type: SUPPLIER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: SUPPLIER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
