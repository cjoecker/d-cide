import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MemoryRouter, Route } from "react-router-dom";
import React from "react";

export type paramsType = {
	param: string;
	value: string;
};

export const renderWithRoute = (component: React.ReactElement, routePath: string, params: paramsType | paramsType[]) => {
	let pathWithParamsValues = routePath;

	if (params instanceof Array)
		params.map(param => {
			pathWithParamsValues = pathWithParamsValues.replace(`:${param.param}`, param.value);
		});
	else pathWithParamsValues = pathWithParamsValues.replace(`:${params.param}`, params.value);

	return render(
		<Provider store={store}>
			<MemoryRouter initialEntries={[pathWithParamsValues]}>
				<Route path={routePath}>{component}</Route>
			</MemoryRouter>
		</Provider>
	);
};
