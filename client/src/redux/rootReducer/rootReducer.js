const initialState = {
  clients: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "one":
      return { ...state };

    default:
      return { ...state };
  }
}

export default rootReducer;
