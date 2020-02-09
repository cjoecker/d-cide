import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {postSession, postUser, logout, get_unregisteredUser} from "../services/actions/Sessions_Action";
import {postDecision, getDecisions} from "../services/actions/Decisions_Action";
import ReactGA from 'react-ga';
import axios from "axios";

class LandingPage extends Component {
    async componentDidMount() {

        console.log("Token " + axios.defaults.headers.common["Authorization"]);

        //Unregistered User
        if (!this.props.security.validToken) {
            //Get Decisions
            await this.props.get_unregisteredUser();
        }



        if(this.props.security.user.registeredUser){

            //Registered User
            ReactGA.event({
                category: 'Landing page',
                action: 'Registered User',
            });

            this.props.history.push("/decisions");

        }else{
            //Unregistered User
            ReactGA.event({
                category: 'Landing page',
                action: 'Unregistered User',
            });

            //Get Decisions
            await this.props.getDecisions();

            //Open Decision
            if(this.props.decision.decisions.length > 0) {
                this.props.history.push("/decisions/" + this.props.decision.decisions[0].id);
            }else{
                this.props.logout();
                this.props.history.push("/");
            }

        }
    }

    render() {
        return (null);
    }
}

LandingPage.propTypes = {
    LandingPage: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    decision: PropTypes.object.isRequired,
    postSession: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    postUser: PropTypes.func.isRequired,
    get_unregisteredUsersNum: PropTypes.func.isRequired,
    getDecisions: PropTypes.func.isRequired,
    create_exampleData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    LandingPage: state.app,
    security: state.security,
    decision: state.decision
});


export default connect(
    mapStateToProps, {
        postSession,
        logout,
        postUser,
        get_unregisteredUser,
        getDecisions
    })(LandingPage);