export const ACTIONS = {
  RUN: "controls/run",
  STOP: "controls/stop",
  FINISH: 'controls/finish',
  SET_PLAYER_NAME: 'controls/setPlayerName'
};

export const run = () => ({
  type: ACTIONS.RUN,
});

export const stop = () => ({
  type: ACTIONS.STOP,
});

export const setPlayerName = (name) => ({
  type: ACTIONS.SET_PLAYER_NAME,
  payload: name
});

const INITIAL_STATE = {
  started: false,
  running: false,
  gameOver: false,
  playerName: ''
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
    case ACTIONS.SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload,
      };
    default:
      return state;
  }
};
