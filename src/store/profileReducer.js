import axios from 'axios';
import { alertFailure } from './alertReducer';

const profFetchRequest = () => {
  return {
    type: "PROF_REQUEST",
  };
};
const profFetchSuccess = (prof) => {
  return {
    type: "PROF_SUCCESS",
    payload: prof,
  };
};
const profFetchFailure = (errorData) => {
  return {
    type: "PROF_FAILURE",
    payload: errorData,
  };
};
export const profFetchHandler = (acc_no) => {
  return function (dispatch) {
    dispatch(profFetchRequest());
    console.log("prof fetch request");
    axios
      .get(`http://localhost:3000/api/viewcustomers/showcustomer/${acc_no}`)
      .then((res) => {
        console.log("prof fetch success", res.data.customer);
        localStorage.setItem("acc_no", res.data.customer[0].account_number);
        dispatch(profFetchSuccess(res.data.customer));
      })
      .catch((err) => {
        if (err.response) {
          console.log("prof fetch failure");
          console.log(err.error);
          dispatch(alertFailure(err.error));
        } else {
          console.log("not connected to internet");
          dispatch(alertFailure("not connected to internet"));
        }
      })
      .finally(() => {
        console.log("stop loading");
      });
  };
};


const initState = {
  isLoading: false,
  customer: [],
  errorMsg: ""
};

export const profileReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case "PROF_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "PROF_SUCCESS":
      return {
        ...state,
        isLoading: false,
        customer: [...action.payload]
      }
    case "PROF_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload
      }

    default:
      return state;
  }
};