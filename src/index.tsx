///<reference types="webpack-env" />
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import store from './services/redux/store';
import * as serviceWorker from './serviceWorker';

const App = require('./App').default;

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
};

render();
