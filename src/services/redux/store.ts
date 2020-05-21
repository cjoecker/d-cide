import {Action, configureStore} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import CryptoJS from 'crypto-js';
import rootReducer, {RootState} from './rootReducer';

const newRootReducer = require('./rootReducer').default;

const encryptionKey =
	process.env.REACT_APP_localStorageKey != null ? process.env.REACT_APP_localStorageKey : 'localKey';

const encrypt = (input: string): string => {
	return CryptoJS.AES.encrypt(input, encryptionKey).toString();
};

const decrypt = (input: string): string => {
	return CryptoJS.AES.decrypt(input, encryptionKey).toString(CryptoJS.enc.Utf8);
};

const persistedState = localStorage.getItem('reduxState')
	? JSON.parse(decrypt(localStorage.getItem('reduxState') as string))
	: {};

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState: persistedState,
});

store.subscribe(() => {
	localStorage.setItem('reduxState', encrypt(JSON.stringify(store.getState())));
});

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		store.replaceReducer(newRootReducer);
	});
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
