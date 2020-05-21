import {Action, configureStore} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import rootReducer, {RootState} from './rootReducer';

const newRootReducer = require('./rootReducer').default;

const persistedState = localStorage.getItem('reduxState')
	? JSON.parse(localStorage.getItem('reduxState') as string)
	: {};

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState: persistedState,
});

store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		store.replaceReducer(newRootReducer);
	});
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
