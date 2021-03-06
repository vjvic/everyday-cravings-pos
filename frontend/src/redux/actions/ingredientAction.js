import {
  INGREDIENT_ADD_ITEM,
  INGREDIENT_CREATE_FAIL,
  INGREDIENT_CREATE_REQUEST,
  INGREDIENT_CREATE_SUCCESS,
  INGREDIENT_DELETE_FAIL,
  INGREDIENT_DELETE_REQUEST,
  INGREDIENT_DELETE_SUCCESS,
  INGREDIENT_DETAILS_FAIL,
  INGREDIENT_DETAILS_REQUEST,
  INGREDIENT_DETAILS_SUCCESS,
  INGREDIENT_FAIL,
  INGREDIENT_REMOVE_ITEM,
  INGREDIENT_REQUEST,
  INGREDIENT_SUCCESS,
  INGREDIENT_UPDATE_FAIL,
  INGREDIENT_UPDATE_REQUEST,
  INGREDIENT_UPDATE_STOCK_FAIL,
  INGREDIENT_UPDATE_STOCK_REQUEST,
  INGREDIENT_UPDATE_STOCK_SUCCESS,
  INGREDIENT_UPDATE_SUCCESS,
} from "../constants/ingredientConstants";
import { mealApi } from "../../components";
import { logout } from "./userActions";

//Create new ingedients
export const createIngredient = (ingredient) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INGREDIENT_CREATE_REQUEST,
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
      `/api/ingredient`,
      { ...ingredient },
      config
    );

    dispatch({
      type: INGREDIENT_CREATE_SUCCESS,
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
      type: INGREDIENT_CREATE_FAIL,
      payload: message,
    });
  }
};

//Delete ingredients
export const deleteIngredient = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INGREDIENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await mealApi.delete(`/api/ingredient/${id}`, config);

    dispatch({
      type: INGREDIENT_DELETE_SUCCESS,
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
      type: INGREDIENT_DELETE_FAIL,
      payload: message,
    });
  }
};

//Update ingredients
export const updateIngredient = (ingredient) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INGREDIENT_UPDATE_REQUEST,
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
      `/api/INGREDIENT/${ingredient._id}`,
      { ...ingredient },
      config
    );

    dispatch({
      type: INGREDIENT_UPDATE_SUCCESS,
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
      type: INGREDIENT_UPDATE_FAIL,
      payload: message,
    });
  }
};

//Get all ingredients
export const getIngredientList = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    dispatch({ type: INGREDIENT_REQUEST });
    const { data } = await mealApi.get(`/api/INGREDIENT`, config);

    dispatch({ type: INGREDIENT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: INGREDIENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//Get ingredient details
export const getIngredientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INGREDIENT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get(`/api/ingredient/${id}`, config);

    dispatch({
      type: INGREDIENT_DETAILS_SUCCESS,
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
      type: INGREDIENT_DETAILS_FAIL,
      payload: message,
    });
  }
};


//Add ingredient to specific meal
export const addToMealIngredient =
  (id, qtyInMeal) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.get(`/api/ingredient/${id}`, config);

    dispatch({
      type: INGREDIENT_ADD_ITEM,
      payload: {
        ingredient: data._id,
        id: data.id,
        name: data.name,
        qty: data.qty,
        supplier: data.supplier,
        measure: data.measure,
        isActive: data.isActive,
        qtyInMeal,
      },
    });
  };

  // Remove ingredient to specific meal
export const removeFromMealIngredient = (id) => (dispatch) => {
  dispatch({
    type: INGREDIENT_REMOVE_ITEM,
    payload: id,
  });
};

//Update ingredient stock
export const updateIngredientStock =
  (ingredientID, qty) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INGREDIENT_UPDATE_STOCK_REQUEST,
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

      await mealApi.put(
        `/api/ingredient/${ingredientID}/updatestock`,
        { qty },
        config
      );

      dispatch({
        type: INGREDIENT_UPDATE_STOCK_SUCCESS,
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
        type: INGREDIENT_UPDATE_STOCK_FAIL,
        payload: message,
      });
    }
  };
