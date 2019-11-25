import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login, signUp, logout, get_unregisteredUser} from "../services/actions/Security_Action";
import {create_exampleData, create_project, get_projects} from "../services/actions/Projects_Action";
import ReactGA from 'react-ga';

class LandingPage extends Component {
    async componentDidMount() {



        //Unregistered User
        if (!this.props.security.validToken) {
            //Get Projects
            await this.props.get_unregisteredUser();

        }

        if(this.props.security.user.registeredUser){

            ReactGA.event({
                category: 'Landing page',
                action: 'Registered User',
            });

            //Registered User
            this.props.history.push("/decisions");

        }else{
            //Unregistered User
            ReactGA.event({
                category: 'Landing page',
                action: 'Unregistered User',
            });

            //Get Projects
            await this.props.get_projects();

            //Open Decision
            if(this.props.project.projects.length > 0) {
                this.props.history.push("/decisions/" + this.props.project.projects[0].id);
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
    project: PropTypes.object.isRequired,
    create_project: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    get_unregisteredUsersNum: PropTypes.func.isRequired,
    get_projects: PropTypes.func.isRequired,
    create_exampleData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    LandingPage: state.app,
    security: state.security,
    project: state.project
});


export default connect(
    mapStateToProps, {
        login,
        logout,
        signUp,
        get_unregisteredUser,
        create_project,
        get_projects,
        create_exampleData
    })(LandingPage);