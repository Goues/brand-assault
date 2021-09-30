export const ACTIONS = {
  SET_CURRENT: "waves/setCurrent",
  SET_SURVIVED: "waves/setSurvived"
};

export const setCurrent = wave => ({
  type: ACTIONS.SET_CURRENT,
  payload: wave
});

export const setSurvived = wave => ({
  type: ACTIONS.SET_SURVIVED,
  payload: wave
});

const INITIAL_STATE = {
  current: 0,
  survived: 0,
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTIONS.SET_SURVIVED:
      return {
        ...state,
        survived: action.payload,
      };
    default:
      return state;
  }
};
