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
import {get_decisions, create_decision, delete_decision, edit_decision} from "../../services/actions/Decisions_Action";
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


class Decisions extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            decisions: [],
            newEntry: '',
            isMounted: false,
            errors: {},
            showAskBeforeDelete: false,
            DeleteDecisionNum: '',
            DeleteDecisionName: "",
        };
        this.createDecision = this.createDecision.bind(this);
        this.deleteDecision = this.deleteDecision.bind(this);
        this.goToDecision = this.goToDecision.bind(this);
        this.onChangeDecision = this.onChangeDecision.bind(this);

        this.deleteDecision = this.deleteDecision.bind(this);
        this.cancelDeleteDecision = this.cancelDeleteDecision.bind(this);
    }


    async componentDidMount() {
        await this.props.get_decisions();

        if (!this.props.security.user.registeredUser){
            this.goToDecision(this.props.decision.decisions[0].id)
        }

        this.setState({isMounted: true});
    }





    //Refresh when redux state changes
    componentDidUpdate(prevProps, prevState, snapshot) {

        //Get Decisions
        if (prevProps.decision !== this.props.decision) {
            this.setState({decisions: this.props.decision.decisions});
        }

        //Go to decision when decision created
        if (prevProps.decision.decisions.length !== 0 &&
            prevProps.decision.decisions.length < this.props.decision.decisions.length &&
            this.state.isMounted === true
        ) {
            const prevSet = new Set(prevProps.decision.decisions.map(o => o.id));
            const added = this.props.decision.decisions.filter(o => !prevSet.has(o.id));

            let decisionId = added[0].id;
            this.goToDecision(decisionId);
        }


    }


    async createDecision() {

        //Exit if entry
        if (this.state.newEntry === '') return;

        const newEntry = {
            name: this.state.newEntry
        };

        await this.props.create_decision(newEntry);

        this.setState({
            newEntry: '',
        });

    }


    deleteDecisionClick(id, name) {

        this.setState({
            showAskBeforeDelete: true,
            DeleteDecisionNum: id,
            DeleteDecisionName: name,
        });

    }

    goToDecision(id) {
        this.props.history.push(`/decisions/${id}`);
    }

    onChangeNewEntry = (event) => {
        this.setState({newEntry: event.target.value});
    };


    onChangeDecision = (event, decisionLocal) => {

        let array = this.state.decisions;
        let objIndex = array.findIndex((obj => obj.id === decisionLocal.id));
        array[objIndex].name = event.target.value;
        this.setState({
            decisions: array
        });

    };

    editDecisionName(decisionLocal) {

        //Exit if entry empty
        if (decisionLocal.name === '') {
            this.deleteDecision(decisionLocal.id);
            return;
        }
        this.props.edit_decision(decisionLocal);

    }

    async deleteDecision(e) {

        this.props.delete_decision(this.state.DeleteDecisionNum);

        this.setState({
            showAskBeforeDelete: false,
            DeleteDecisionNum: ''
        });

        ReactGA.event({
            category: 'Decisions',
            action: 'Delete Decision'
        });
    };

    cancelDeleteDecision(e) {

        console.log(e);

        this.setState({
            showAskBeforeDelete: false,
            DeleteDecisionNum: ''
        });

        ReactGA.event({
            category: 'Decisions',
            action: 'Cancel Delete Decision'
        });
    };

    render() {
        const {classes} = this.props;
        const {decisions, isMounted} = this.state;

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
                                                this.createDecision();
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
                                            onClick={this.createDecision}
                                        >
                                            <AddIcon/>
                                        </Fab>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Paper>
                            {decisions.map(decision =>
                                <Paper elevation={2} key={decision.id} className={classes.paper}>
                                    <ListItem>
                                        <InputBase
                                            multiline
                                            className={classes.inputBaseItem}
                                            value={decision.name}
                                            onChange={(event) => this.onChangeDecision(event, decision)}
                                            onBlur={() => this.editDecisionName(decision)}
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
                                                onClick={() => this.deleteDecisionClick(decision.id, decision.name)}
                                                 style={{marginRight: 7}}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                            <Fab
                                                size="small"
                                                color="primary"
                                                aria-label="Work on Decision"
                                                onClick={() => this.goToDecision(decision.id)}
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
                    title={`Delete ${this.state.DeleteDecisionName}?`}
                    message="Your decision will be permanently deleted. This cannot be undone."
                    primaryButtonText="Delete it"
                    secondaryButtonText="Cancel"
                    handlePrimary={(e) => this.deleteDecision(e)}
                    handleSecondary={(e) => this.cancelDeleteDecision(e)}
                />
            </div>
        );
    }
}

Decisions.propTypes = {
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    decision: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    get_decisions: PropTypes.func.isRequired,
    create_decision: PropTypes.func.isRequired,
    delete_decision: PropTypes.func.isRequired,
    edit_decision: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    decision: state.decision,
    security: state.security,
});


export default connect(mapStateToProps, {
    get_decisions,
    create_decision,
    delete_decision,
    edit_decision
})(withStyles(styles)(Decisions));
