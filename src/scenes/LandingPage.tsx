import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../services/redux/rootReducer";
// import {getUnregisteredUser} from "../services/redux/Sessions_Actions";
// import {WithStyles} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getDecisions } from "../services/redux/DecisionsActions";
import { createUnregisteredUser } from "../services/redux/SessionActions";


//TODO Make this a function and not a component
interface Props {}

const LandingPage: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { token } = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);
	const { user } = useSelector(
		(state: RootState) => state.Session,
		shallowEqual
	);

	const decisions = useSelector(
		(state: RootState) => state.Decisions,
		shallowEqual
	);

	useEffect(() => {
		if (token == "") {
			createUnregisteredUser(dispatch);
		} else {
			if (user.registeredUser) {
				history.push("/decisions");
			} else {
				getDecisions(dispatch);
			}
		}
	}, []);

	useEffect(() => {
		if (user.id !== 0) getDecisions(dispatch);
	}, [user]);

	useEffect(() => {
		if (decisions.length > 0)
			history.push("/decisions/" + decisions[decisions.length - 1].id);
	}, [decisions]);

	return null;
};

export default LandingPage;
