import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as credits } from "./credits";
import { reducer as towers } from "./towers";
import { reducer as waves } from "./waves";

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
  combineReducers({ credits, products, towers, waves }),
  applyMiddleware(thunk)
);

export default store;
