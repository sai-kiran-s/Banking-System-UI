import axios from 'axios';
import { alertFailure } from './alertReducer';

const transFetchRequest = () => {
  return {
    type: "TRANS_REQUEST",
  };
};
const transFetchSuccess = (trans) => {
  return {
    type: "TRANS_SUCCESS",
    payload: trans,
  };
};
const transFetchFailure = (errorData) => {
  return {
    type: "TRANS_FAILURE",
    payload: errorData,
  };
};
export const transFetchHandler = () => {
  return function (dispatch) {
    dispatch(transFetchRequest());
    console.log("trans fetch request");
    axios
      .get("http://localhost:3000/api/viewtransactions/all")
      .then((res) => {
        console.log("trans fetch success", res.data.transactions);
        // localStorage.setItem("cust", JSON.stringify(res.data.data));
        dispatch(transFetchSuccess(res.data.transactions));
      })
      .catch((err) => {
        if (err.response) {
          console.log("trans fetch failure");
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

export const custTransFetchHandler = (acc_no) => {
  return function (dispatch) {
    dispatch(transFetchRequest());
    console.log("trans fetch request");
    axios
      .get(`http://localhost:3000/api/viewtransactions/${acc_no}`)
      .then((res) => {
        console.log("trans fetch success", res.data.transactions);
        // localStorage.setItem("cust", JSON.stringify(res.data.data));
        dispatch(transFetchSuccess(res.data.transactions));
      })
      .catch((err) => {
        if (err) {
          console.log("trans fetch failure");
          console.log(err.response);
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
  transactions: [],
  errorMsg: ""
};

export const transactionReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case "TRANS_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "TRANS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        transactions: [...action.payload]
      }
    case "TRANS_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload
      }

    default:
      return state;
  }
};