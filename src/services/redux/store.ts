import {Action, configureStore} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import rootReducer, {RootState} from './rootReducer';
import {encrypt, persistedState, storeStorageKey} from './storeEncription';

const newRootReducer = require('./rootReducer').default;

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState: persistedState(),
});

store.subscribe(() => {
	localStorage.setItem(storeStorageKey, encrypt(store.getState()));
});

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		store.replaceReducer(newRootReducer);
	});
}

console.log('hola');

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
