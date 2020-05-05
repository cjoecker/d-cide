import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../redux/rootReducer";
import { getDecisions } from "../redux/actionsAndSlicers/DecisionsActions";
import { createUnregisteredUser } from "../redux/actionsAndSlicers/SessionActions";

const LandingPage: React.FC = () => {
	const {token} = useSelector((state: RootState) => state.Session, shallowEqual);
	const {user} = useSelector((state: RootState) => state.Session, shallowEqual);

	const decisions = useSelector((state: RootState) => state.Decisions, shallowEqual);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (token === '') createUnregisteredUser(dispatch);
		else getDecisions(dispatch);
	}, []);

	useEffect(() => {
		if (user.id !== 0) getDecisions(dispatch);
	}, [user]);

	useEffect(() => {
		if (decisions.length > 0) history.push(`/decisions/${decisions[decisions.length - 1].id}`);
	}, [decisions]);

	return null;
};

export default LandingPage;
