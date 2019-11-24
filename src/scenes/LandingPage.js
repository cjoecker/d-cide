import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {get_unregisteredUsersNum, login, signUp, logout} from "../services/actions/Security_Action";
import {create_exampleData, create_project, get_projects} from "../services/actions/Projects_Action";
import ReactGA from 'react-ga';

class LandingPage extends Component {
    async componentDidMount() {
        //Unregistered User
        if (!this.props.security.validToken) {

            ReactGA.event({
                category: 'Landing page',
                action: 'Create New User'
            });

            //get total number of unregistered users
            await this.props.get_unregisteredUsersNum();

            //create random user
            let userName = (this.props.security.unregisteredUsers + 1) + "@UnregisteredUser.com";
            let password = Math.random().toString(36).substring(4);

            const newUser = {
                username: userName,
                registeredUser: false,
                fullName: "Unregistered User",
                password: password,
                confirmPassword: password
            };

            await this.props.signUp(newUser, this.props.history);

            //Login random user

            const user = {
                username: userName,
                password: password
            };

            await this.props.login(user);

            //Create Project
            const project = {
                name: "Unnamed Decision"
            };

            await this.props.create_project(project);

            //Create Example Data
            await this.props.create_exampleData();
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

            //Open Project
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
        get_unregisteredUsersNum,
        create_project,
        get_projects,
        create_exampleData
    })(LandingPage);