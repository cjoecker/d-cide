import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "./index.css";
import {BrowserRouter as Router} from "react-router-dom";
import store from "./services/redux/store";

const App = require("./App").default;

const render = () => {


	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<App/>
			</Router>
		</Provider>,
		document.getElementById("root")
	);
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
	module.hot.accept("./App", render);
}
