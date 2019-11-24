import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Paper from "@material-ui/core/Paper/index";
import InputBase from "@material-ui/core/es/InputBase";
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";


import {connect} from "react-redux";
import {get_projects, create_project, delete_project, edit_project} from "../../services/actions/Projects_Action";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TwoButtonsDialog from "../../components/TwoButtonsDialog";
import ReactGA from "react-ga";
import IconButton from "@material-ui/core/IconButton/IconButton";


const styles = theme => ({

    root: {
        paddingTop: theme.spacing.unit * 8,
    },

    titleText: {
        textAlign: "center",
        marginTop: theme.spacing.unit * 1,
    },

    gridItem: {
        textAlign: "center",
        maxWidth: theme.spacing.unit * 63
    },

    firstPaper: {
        marginTop: theme.spacing.unit * 0.8,
        marginBottom: theme.spacing.unit * 4,
    },

    paper: {
        marginTop: theme.spacing.unit * 0.8,
    },

    inputBaseNewEntry: {
        marginRight: theme.spacing.unit * 2,
        width: "100%",
    },

    inputBaseItem: {
        marginRight: theme.spacing.unit * 9,
        width: "100%",
    },


});


class Projects extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            newEntry: '',
            isMounted: false,
            errors: {},
            showAskBeforeDelete: false,
            DeleteDecisionNum: '',
        };
        this.createProject = this.createProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.goToProject = this.goToProject.bind(this);
        this.onChangeProject = this.onChangeProject.bind(this);

        this.deleteDecision = this.deleteDecision.bind(this);
        this.cancelDeleteDecision = this.cancelDeleteDecision.bind(this);
    }


    async componentDidMount() {
        await this.props.get_projects();

        if (!this.props.security.user.registeredUser){
            this.goToProject(this.props.project.projects[0].id)
        }

        this.setState({isMounted: true});
    }





    //Refresh when redux state changes
    componentDidUpdate(prevProps, prevState, snapshot) {

        //Get Projects
        if (prevProps.project !== this.props.project) {
            this.setState({projects: this.props.project.projects});
        }

        //Go to decision when project created
        if (prevProps.project.projects.length !== 0 &&
            prevProps.project.projects.length < this.props.project.projects.length &&
            this.state.isMounted === true
        ) {
            const prevSet = new Set(prevProps.project.projects.map(o => o.id));
            const added = this.props.project.projects.filter(o => !prevSet.has(o.id));

            let projectId = added[0].id;
            this.goToProject(projectId);
        }


    }


    async createProject() {

        //Exit if entry
        if (this.state.newEntry === '') return;

        const newEntry = {
            name: this.state.newEntry
        };

        await this.props.create_project(newEntry);

        this.setState({
            newEntry: '',
        });

    }


    deleteProject(id) {

        this.setState({
            showAskBeforeDelete: true,
            DeleteDecisionNum: id
        });

    }

    goToProject(id) {
        this.props.history.push(`/decisions/${id}`);
    }

    onChangeNewEntry = (event) => {
        this.setState({newEntry: event.target.value});
    };


    onChangeProject = (event, projectLocal) => {

        let array = this.state.projects;
        let objIndex = array.findIndex((obj => obj.id === projectLocal.id));
        array[objIndex].name = event.target.value;
        this.setState({
            projects: array
        });

    };

    editProjectName(projectLocal) {

        //Exit if entry empty
        if (projectLocal.name === '') {
            this.deleteProject(projectLocal.id);
            return;
        }
        this.props.edit_project(projectLocal);

    }

    async deleteDecision(e) {

        this.props.delete_project(this.state.DeleteDecisionNum);

        this.setState({
            showAskBeforeDelete: false,
            DeleteDecisionNum: ''
        });

        ReactGA.event({
            category: 'Projects',
            action: 'Delete Decision'
        });
    };

    cancelDeleteDecision(e) {

        this.setState({
            showAskBeforeDelete: false,
            DeleteDecisionNum: ''
        });

        ReactGA.event({
            category: 'Projects',
            action: 'Cancel Delete Decision'
        });
    };

    render() {
        const {classes} = this.props;
        const {projects, isMounted} = this.state;

        return (
            isMounted &&
            <div className={classes.root}>
                <Typography variant="h3" className={classes.titleText} gutterBottom>
                    Decisions
                </Typography>
                <Grid container justify="center">
                    <Grid item xs={12} className={classes.gridItem}>
                        <List>

                            <Paper elevation={2} key="New Entry" className={classes.firstPaper}>
                                <ListItem>
                                    <InputBase
                                        name="newEntry"
                                        className={classes.inputBaseNewEntry}
                                        placeholder="New Decision"
                                        value={this.state.newEntry}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                event.preventDefault();
                                                this.createProject();
                                            }
                                        }}
                                        onChange={this.onChangeNewEntry}
                                        multiline
                                    />
                                    <ListItemSecondaryAction>
                                        <Fab
                                            size="small"
                                            color="primary"
                                            aria-label="Add"
                                            onClick={this.createProject}
                                        >
                                            <AddIcon/>
                                        </Fab>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Paper>
                            {projects.map(project =>
                                <Paper elevation={2} key={project.id} className={classes.paper}>
                                    <ListItem>
                                        <InputBase
                                            multiline
                                            className={classes.inputBaseItem}
                                            value={project.name}
                                            onChange={(event) => this.onChangeProject(event, project)}
                                            onBlur={() => this.editProjectName(project)}
                                            onKeyPress={(event) => {
                                                if (event.key === 'Enter') {
                                                    event.preventDefault();
                                                    event.target.blur();
                                                }
                                            }}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                                aria-label="Delete"
                                                onClick={() => this.deleteProject(project.id)}
                                                 style={{marginRight: 7}}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                            <Fab
                                                size="small"
                                                color="primary"
                                                aria-label="Work on Decision"
                                                onClick={() => this.goToProject(project.id)}
                                            >
                                                <ArrowForwardIcon/>
                                            </Fab>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </Paper>
                            )}
                        </List>
                    </Grid>
                </Grid>
                {/*Ask before deleting*/}
                <TwoButtonsDialog
                    show={this.state.showAskBeforeDelete}
                    title="Do you really want to delete this decision?"
                    message="Your decision will be deleted permanently and the it won't be possible to restore the information."
                    primaryButtonText="Delete it"
                    secondaryButtonText="Cancel"
                    handlePrimary={(e) => this.deleteDecision(e)}
                    handleSecondary={(e) => this.cancelDeleteDecision(e)}
                />
            </div>
        );
    }
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    get_projects: PropTypes.func.isRequired,
    create_project: PropTypes.func.isRequired,
    delete_project: PropTypes.func.isRequired,
    edit_project: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    project: state.project,
    security: state.security,
});


export default connect(mapStateToProps, {
    get_projects,
    create_project,
    delete_project,
    edit_project
})(withStyles(styles)(Projects));
