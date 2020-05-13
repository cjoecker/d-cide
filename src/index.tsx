///<reference types="webpack-env" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import store from './services/redux/store';

const App = require('./App').default;

const render = () => {
	console.log(`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`);

	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./App', render);
}
