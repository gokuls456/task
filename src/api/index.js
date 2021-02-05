import * as actionTypes from "../actions";
import axios from "axios";
import { BASE_PATH } from "./apiPath";
export const getAPI = apiData => {
  return {
    type: actionTypes.GET_API_DATA
  };
};
export const setAPI = apiData => {
  return {
    type: actionTypes.SET_API_DATA,
    apiData: apiData
  };
};
export const setAPIfail = error => {
  return {
    type: actionTypes.SET_API_DATA_FAIL,
    error: error
  };
};

export const apiCall = apiData => {
  const url = `${BASE_PATH}/api/v1/project_view/`;
  return dispatch => {
    dispatch(getAPI());
    axios
      .get(url)
      .then(res => {
        dispatch(setAPI(res.data));
      })
      .catch(error => {
        error.response
          ? dispatch(setAPIfail(error.response.data))
          : dispatch(setAPIfail(true));
      });
  };
};
