import React from "react";
import {Alert, AlertTypes} from "./reducers/Alerts_Reducer";


//ERRORS
export const HTTP_ERROR : Alert = {
  type: AlertTypes.error,
  allowDelete: true,
  autoHide: false,
  text: "",
};


//WARNINGS
export const NOT_ENOUGH_OPTIONS : Alert = {
  type: AlertTypes.warning,
  allowDelete: false,
  autoHide: false,
  text: "At least two decision options are necessary! ",
};

export const NOT_ENOUGH_CRITERIA : Alert = {
  type: AlertTypes.warning,
  allowDelete: false,
  autoHide: false,
  text: "At least two selection criteria are necessary! ",
};
