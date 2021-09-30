export const ACTIONS = {
  RUN: "controls/run",
  STOP: "controls/stop",
  FINISH: 'controls/finish'
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
  gameOver: false,
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
    case ACTIONS.FINISH:
      return {
        ...state,
        gameOver: true,
        running: false,
      };
    default:
      return state;
  }
};
