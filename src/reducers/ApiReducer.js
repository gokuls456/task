import * as ActionTypes from "../actions";
const initialState = {
  apiData: undefined,
  loading: true,
  error: null,
  success: false
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_API_DATA:
      return {
        apiData: undefined,
        loading: true,
        error: false,
        success: false
      };

    case ActionTypes.SET_API_DATA:
      return {
        error: false,
        loading: false,
        apiData: action.apiData,
        success: true
      };

    case ActionTypes.SET_API_DATA_FAIL:
      return {
        loading: true,
        error: action.error,
        apiData: undefined
      };

    default:
      return state;
  }
};

export default apiReducer;
