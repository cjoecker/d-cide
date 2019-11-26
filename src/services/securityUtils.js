import axios from "axios";
import jwt_decode from "jwt-decode";

const setJWTToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};


export function setUser(token) {
    // extract token from res.data

    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);

    // set our token in header ***
    setJWTToken(token);

    // decode token on React
    return jwt_decode(token);

}


export default setJWTToken ;
