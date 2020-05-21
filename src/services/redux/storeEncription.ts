import CryptoJS from 'crypto-js';
import {RootState} from './rootReducer';

const encryptionKey =
	process.env.REACT_APP_localStorageKey != null ? process.env.REACT_APP_localStorageKey : 'localKey';

export const encrypt = (input: RootState): string => {
	return CryptoJS.AES.encrypt(JSON.stringify(input), encryptionKey).toString();
};

export const decrypt = (input: string): string => {
	return CryptoJS.AES.decrypt(input, encryptionKey).toString(CryptoJS.enc.Utf8);
};
//TODO refactor
// eslint-disable-next-line import/no-mutable-exports
let persistedState = {};

try {
	persistedState = JSON.parse(decrypt(localStorage.getItem('reduxState') as string));
	// eslint-disable-next-line no-empty
} catch (e) {}

export default persistedState;
