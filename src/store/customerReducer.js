import axios from 'axios';
import { alertFailure } from './alertReducer';

const custFetchRequest = () => {
  return {
    type: "CUST_REQUEST",
  };
};
const custFetchSuccess = (cust) => {
  return {
    type: "CUST_SUCCESS",
    payload: cust,
  };
};
const custFetchFailure = (errorData) => {
  return {
    type: "CUST_FAILURE",
    payload: errorData,
  };
};
export const custFetchHandler = () => {
  return function (dispatch) {
    dispatch(custFetchRequest());
    console.log("cust fetch request");
    axios
      .get("http://localhost:3000/api/viewcustomers/all")
      .then((res) => {
        console.log("cust fetch success", res.data.customers);
        // localStorage.setItem("cust", JSON.stringify(res.data.data));
        dispatch(custFetchSuccess(res.data.customers));
      })
      .catch((err) => {
        if (err.response) {
          console.log("cust fetch failure");
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

export const custExceptFetchHandler = (acc_no) => {
  return function (dispatch) {
    dispatch(custFetchRequest());
    console.log("cust fetch request");
    axios
      .get(`http://localhost:3000/api/viewcustomers/exceptcustomer/${acc_no}`)
      .then((res) => {
        console.log("cust fetch success", res.data.customers);
        // localStorage.setItem("cust", JSON.stringify(res.data.data));
        dispatch(custFetchSuccess(res.data.customers));
      })
      .catch((err) => {
        if (err.response) {
          console.log("cust fetch failure");
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
  customers: [],
  errorMsg: ""
};

export const customerReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case "CUST_REQUEST":
      return {
        ...state,
        isLoading: true
      }
    case "CUST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        customers: [...action.payload]
      }
    case "CUST_FAILURE":
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload
      }

    default:
      return state;
  }
};