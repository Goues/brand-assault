export const ACTIONS = {
  RUN: "controls/run",
  STOP: "controls/stop"
};

export const run = () => ({
  type: ACTIONS.RUN,
});

export const stop = () => ({
  type: ACTIONS.STOP,
});

const INITIAL_STATE = {
  started: false,
  running: false,
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.RUN:
      return {
        ...state,
        started: true,
        running: true,
      };
    case ACTIONS.STOP:
      return {
        ...state,
        running: false,
      };
    default:
      return state;
  }
};
