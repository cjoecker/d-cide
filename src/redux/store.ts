import {Action, configureStore} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import rootReducer, {RootState} from './rootReducer';

const newRootReducer = require('./rootReducer').default;

const store = configureStore({
	reducer: rootReducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		store.replaceReducer(newRootReducer);
	});
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
