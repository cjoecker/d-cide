import React, {Component} from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import InputBase from "@material-ui/core/es/InputBase/InputBase";
import Paper from "@material-ui/core/Paper/Paper";
import ReactGA from 'react-ga';
import {connect} from "react-redux";
import {get_items, create_item, delete_item, edit_item} from "../../../services/actions/OptionsAndCriteria_Action";


const styles = theme => ({
    root: {
        flexGrow: 1,
        minWidth: theme.spacing.unit * 37,
    },

    paper: {
        marginTop: theme.spacing.unit * 0.4
    },

    inputBase: {
        marginRight: theme.spacing.unit * 2,
        width: "100%",
        wordWrap: "break-word"
    },
});


class EditableList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newEntry: '',
            items: [],
            isLoading: true,
            noData: false,
        };

        this.onCreateItem = this.onCreateItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onChangeNewEntry = this.onChangeNewEntry.bind(this);
        this.onBlurItem = this.onBlurItem.bind(this);

    }


    //GET_ITEMS
    async componentDidMount() {
        await this.props.get_items(this.props.itemsKey, this.props.decisionId);
    }


    //Refresh when redux state changes
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.optionsAndCriteria[this.props.itemsKey] !== this.props.optionsAndCriteria[this.props.itemsKey]) {
            this.setState({items: this.props.optionsAndCriteria[this.props.itemsKey]});
        }
    }


    //CREATE_ITEM
    onCreateItem() {
        if (!isNaN(this.state.items)) {
            ReactGA.event({
                category: 'Options And Criteria',
                action: 'Items number from ' + this.props.itemsKey,
                value: this.state.items.length + 1,
            });
        }

        //Exit if entry
        if (this.state.newEntry === '') return;

        const newEntry = {
            name: this.state.newEntry
        };

        this.props.create_item(newEntry, this.props.itemsKey, this.props.decisionId);

        this.setState({newEntry: ''});

        ReactGA.event({
            category: 'Options And Criteria',
            action: 'Create item in ' + this.props.itemsKey,
        });
    }


    //DELETE_ITEM
    onDeleteItem(id) {
        if (!isNaN(this.state.items)) {
            ReactGA.event({
                category: 'Options And Criteria',
                action: 'Items number from ' + this.props.itemsKey,
                value: this.state.items.length - 1,
            });
        }

        this.props.delete_item(id, this.props.itemsKey, this.props.decisionId);

        ReactGA.event({
            category: 'Options And Criteria',
            action: 'Delete item in ' + this.props.itemsKey,
        });
    }


    onChangeNewEntry = (event) => {
        this.setState({newEntry: event.target.value});
    };

    //EDIT_ITEM
    onChangeItem = (event, itemLocal) => {

        let array = this.state.items;
        let objIndex = array.findIndex((obj => obj.id === itemLocal.id));
        array[objIndex].name = event.target.value;
        this.setState({
            items: array
        });

    };

    //LEAVE ITEM
    onBlurItem(itemLocal) {

        //Exit if entry empty
        if (itemLocal.name === '') {
            this.onDeleteItem(itemLocal.id);
            return;
        }
        this.props.edit_item(itemLocal, this.props.itemsKey, this.props.decisionId);

        ReactGA.event({
            category: 'Options And Criteria',
            action: 'Edit item in ' + this.props.itemsKey,
        });

    }


    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <List>
                    <Paper className="floating" elevation={2} key="NewEntry">
                        <ListItem>
                            <InputBase
                                className={classes.inputBase}
                                placeholder="New Entry"
                                value={this.state.newEntry}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        this.onCreateItem();
                                    }
                                }}

                                onChange={this.onChangeNewEntry}
                                multiline
                            />

                            <ListItemSecondaryAction>
                                <IconButton
                                    aria-label="Add"
                                    className={classes.margin}
                                    onClick={this.onCreateItem}>
                                    <AddIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                    {this.state.items.map(item =>
                        <Paper className={classes.paper} elevation={2} key={item.id}>
                            <ListItem>
                                <InputBase
                                    className={classes.inputBase}
                                    value={item.name}
                                    onChange={(event) => this.onChangeItem(event, item)}
                                    onBlur={() => this.onBlurItem(item)}
                                    multiline
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            event.target.blur();
                                        }
                                    }}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={() => this.onDeleteItem(item.id)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Paper>
                    )}
                </List>
            </div>
        );
    }
}


EditableList.propTypes = {
    optionsAndCriteria: PropTypes.object.isRequired,
    get_items: PropTypes.func.isRequired,
    create_item: PropTypes.func.isRequired,
    delete_item: PropTypes.func.isRequired,
    edit_item: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    optionsAndCriteria: state.optionsAndCriteria
});


export default connect(mapStateToProps, {
    get_items,
    create_item,
    delete_item,
    edit_item
})(withStyles(styles)(EditableList));

