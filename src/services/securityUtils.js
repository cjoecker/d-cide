import axios from "axios";

export function setJwt(token) {


    if (token) {
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);

        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }

}

export default setJwt ;
