import { AxiosResponse } from "axios";

const axiosResponse: AxiosResponse = {
	data: [],
	status: 200,
	statusText: 'OK',
	config: {},
	headers: {},
};

export default {
	default: {
		get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
	},
	get: jest.fn(() => Promise.resolve(axiosResponse)),
	post: jest.fn(() => Promise.resolve(axiosResponse)),
	put: jest.fn(() => Promise.resolve(axiosResponse)),
	delete: jest.fn(() => Promise.resolve(axiosResponse)),
};