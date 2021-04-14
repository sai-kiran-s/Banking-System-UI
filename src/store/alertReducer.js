export const alertSuccess = (prof) => {
  return {
    type: "ALERT_SUCCESS",
    payload: prof,
  };
};

export const alertFailure = (errorData) => {
  return {
    type: "ALERT_FAILURE",
    payload: errorData,
  };
};
export const ClearAlert = (errorData) => {
  return {
    type: "CLEAR_ALERT_FAILURE",
  };
};
const initState = {
  message: ""
};

export const alertReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case "ALERT_SUCCESS":
      return {
        message: action.payload
      }
    case "ALERT_FAILURE":
      return {
        message: action.payload
      }
    case "CLEAR_ALERT_FAILURE":
      return {
        message: ""
      }
    default:
      return state;
  }
};