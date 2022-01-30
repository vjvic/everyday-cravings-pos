import {
  INGREDIENT_CREATE_FAIL,
  INGREDIENT_CREATE_REQUEST,
  INGREDIENT_CREATE_RESET,
  INGREDIENT_CREATE_SUCCESS,
  INGREDIENT_DELETE_FAIL,
  INGREDIENT_DELETE_REQUEST,
  INGREDIENT_DELETE_SUCCESS,
  INGREDIENT_DETAILS_FAIL,
  INGREDIENT_DETAILS_REQUEST,
  INGREDIENT_DETAILS_RESET,
  INGREDIENT_DETAILS_SUCCESS,
  INGREDIENT_FAIL,
  INGREDIENT_REQUEST,
  INGREDIENT_SUCCESS,
  INGREDIENT_UPDATE_FAIL,
  INGREDIENT_UPDATE_REQUEST,
  INGREDIENT_UPDATE_RESET,
  INGREDIENT_UPDATE_SUCCESS,
} from "../constants/ingredientConstants";

export const ingredientListReducer = (state = { ingredient: [] }, action) => {
  switch (action.type) {
    case INGREDIENT_REQUEST:
      return { loading: true, ingredient: [] };
    case INGREDIENT_SUCCESS:
      return { loading: false, ingredient: action.payload };
    case INGREDIENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ingredientDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INGREDIENT_DELETE_REQUEST:
      return { loading: true };
    case INGREDIENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case INGREDIENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ingredientCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INGREDIENT_CREATE_REQUEST:
      return { loading: true };
    case INGREDIENT_CREATE_SUCCESS:
      return { loading: false, success: true, ingredient: action.payload };
    case INGREDIENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case INGREDIENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const ingredientUpdateReducer = (state = { ingredient: {} }, action) => {
  switch (action.type) {
    case INGREDIENT_UPDATE_REQUEST:
      return { loading: true };
    case INGREDIENT_UPDATE_SUCCESS:
      return { loading: false, success: true, ingredient: action.payload };
    case INGREDIENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case INGREDIENT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const ingredientDetailsReducer = (
  state = { ingredient: {} },
  action
) => {
  switch (action.type) {
    case INGREDIENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case INGREDIENT_DETAILS_SUCCESS:
      return { loading: false, ingredient: action.payload };
    case INGREDIENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case INGREDIENT_DETAILS_RESET:
      return { ingredient: {} };
    default:
      return state;
  }
};
