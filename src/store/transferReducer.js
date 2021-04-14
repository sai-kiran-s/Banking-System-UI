import axios from 'axios';
import { alertFailure, alertSuccess } from './alertReducer';
const transferRequest = () => {
  return {
    type: "TRANSFER_REQUEST",
  };
};
const transferSuccess = (trans) => {
  return {
    type: "TRANSFER_SUCCESS",
    payload: trans,
  };
};
const transferFailure = (errorData) => {
  return {
    type: "TRANSFER_FAILURE",
    payload: errorData,
  };
};
export const transferHandler = (sender_account_number, receiver_account_number, amount) => {
  return function (dispatch) {
    dispatch(transferRequest());
    console.log("transfer request");
    axios
      .post("/api/transfer", {
        sender_account_number,
        receiver_account_number,
        amount
      })
      .then((res) => {
        console.log("transfer success", res.data.message);
        // localStorage.setItem("cust", JSON.stringify(res.data.data));
        dispatch(alertSuccess(res.data.message));
      })
      .catch((err) => {
        if (err.response) {
          console.log("transfer failure");
          console.log(err.response.data.message);
          dispatch(alertFailure(err.response.data.message));
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
  message: [],
  errorMsg: ""
};

export const transferReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case "TRANSFER_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "TRANSFER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        message: action.payload
      }
    case "TRANSFER_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload
      }

    default:
      return state;
  }
};