const ACTIONS = {
  BUILD: "tower/build"
};

export const buildTower = (x, y) => ({
  type: ACTIONS.BUILD,
  payload: { x, y }
});

const INITIAL_STATE = [];

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.BUILD: {
      const { x, y } = action.payload;
      return [
        ...state,
        {
          level: 1,
          x,
          y
        }
      ];
    }
    default:
      return state;
  }
};
