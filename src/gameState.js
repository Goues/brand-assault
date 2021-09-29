import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";

const credits = (state = 0, action) => {
  switch (action.type) {
    case "ADD_CREDITS":
      return state + action.payload;
    case "SUBTRACT_CREDITS":
      return state - action.payload;
    default:
      return state;
  }
};

const INITIAL_PRODUCTS = {
  COMMUNITY: 0,
  PUBLISHER: 0,
  ANALYTICS: 0,
  INFLUENCERS: 0,
  AUDIENCES: 0
};

const products = (state = INITIAL_PRODUCTS, action) => {
  switch (action.type) {
    case "BUY_PRODUCT":
      return {
        ...state,
        [action.payload]: state[action.payload] + 1
      };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ credits, products }),
  applyMiddleware(thunk)
);

export default store;
