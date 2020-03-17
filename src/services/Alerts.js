import React from 'react';


//ERRORS
export const HTTP_ERROR = {
    type: "error",
    text: "",
    allowDelete: true,
    autoHide: false,
};

//WARNINGS
export const NOT_ENOUGH_OPTIONS = {
    type: "warning",
    text: "At least two decision options are necessary! ",
    allowDelete: false,
    autoHide: false,
};

export const NOT_ENOUGH_CRITERIA = {
    type: "warning",
    text: "At least two selection criteria are necessary! ",
    allowDelete: false,
    autoHide: false,
};