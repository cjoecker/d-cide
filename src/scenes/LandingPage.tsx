import React, {useEffect} from "react";
import {useDispatch, useSelector,shallowEqual} from "react-redux";
import {getUnregisteredUser} from "../services/redux/Sessions_Actions";
import {WithStyles} from "@material-ui/core/styles";
// import { useHistory } from "react-router-dom";

interface Props{

}

const LandingPage: React.FC<Props> = (props: Props) => {

	const dispatch = useDispatch();

	// const {token} = useSelector(state => state.App, shallowEqual);
	// const {user} = useSelector(state => state.Session, shallowEqual);
	// const history = useHistory();

	// useEffect(() => {
	// 	if (token == "") {
	// 		dispatch(getUnregisteredUser);
	// 	} else {
	// 		if (user.registeredUser) {
	// 			history.push("/decisions");
	// 		} else {
	// 			this.props.getDecisions();
	// 		}
	// 	}
	// }, []);
	//
	//
	// componentDidUpdate(prevProps, prevState, snapshot) {
	// 	//change of user
	// 	if (prevProps.security.user !== this.props.security.user) {
	// 		this.props.getDecisions();
	// 	}
	//
	// 	if (prevProps.decision.decisions !== this.props.decision.decisions) {
	// 		const decisionsNumber = this.props.decision.decisions.length;
	// 		if (decisionsNumber > 0) {
	// 			this.props.history.push(
	// 				"/decisions/" + this.props.decision.decisions[decisionsNumber - 1].id
	// 			);
	// 		}
	// 	}
	// }


	return null;

};


export default LandingPage
