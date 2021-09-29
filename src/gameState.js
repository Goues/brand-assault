import { createStore, combineReducers } from "redux";

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

const store = createStore(combineReducers({ credits }));

export default store;
