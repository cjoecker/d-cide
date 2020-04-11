import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";

interface PrivateRouteProps extends RouteProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
	const { component: Component, children, ...rest } = props;

	const { token, user } = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);

	const userValid = token !== "" && user.exp !== 0;

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				userValid ? (
					<Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: '/signin',
							state: { from: routeProps.location }
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;