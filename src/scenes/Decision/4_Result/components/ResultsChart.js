import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import BarChart from "recharts/es6/chart/BarChart";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";
import Bar from "recharts/es6/cartesian/Bar";
import Rectangle from "recharts/es6/shape/Rectangle";
import Cell from "recharts/es6/component/Cell";

import {connect} from "react-redux";
import {getItems} from "../../../../services/actions/OptionsAndCriteria_Action";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import ReactGA from "react-ga";
import Zoom from "@material-ui/core/Zoom";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 0.8,
    },

    rectangle: {
        width: theme.spacing.unit * 19,
    },


});


class ResultsChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            labelsOffset: 0,
        };

    }


    //Load Data from Server
    componentDidMount() {
        this.props.getItems(this.props.itemsKey, this.props.decisionId, true);
    };

    //Refresh when redux state changes
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.optionsAndCriteria[this.props.itemsKey] !== this.props.optionsAndCriteria[this.props.itemsKey]) {
            this.setResults();
        }
    }

    setResults(){
        //Get items
        const items = this.props.optionsAndCriteria[this.props.itemsKey];

        this.setState({items: items});

        //Set labels offset for long items
        const labelsMaxNumChars = 18;
        const maxNumOffset = 35;

        let longest = Math.max(...items.map(movie => movie.name.length));

        const totalOffset = parseInt(longest / labelsMaxNumChars) * maxNumOffset;

        this.setState({labelsOffset: totalOffset});

        if(this.props.optionsAndCriteria[this.props.itemsKey] !== null) {
            ReactGA.event({
                category: 'Result',
                action: 'Items number from ' + this.props.itemsKey,
                value: this.props.optionsAndCriteria[this.props.itemsKey].length,
            });
        }
    }

    render() {
        const {classes} = this.props;
        const {items} = this.state;

        const labelsWidth = 100 + this.state.labelsOffset;

        return (
            <div className={classes.root}>
                <ResponsiveContainer height={items.length * 70 + 10} width="100%">
                    <BarChart
                        data={items}
                        margin={{top: 5, right: 40, left: 40, bottom: 20}}
                        layout="vertical"
                        barCategoryGap="20%"
                        barGap={2}
                        maxBarSize={10}
                    >
                        <CartesianGrid
                            horizontal={false}
                            stroke='#a0a0a0'
                            strokeWidth={0.5}
                        />
                        <XAxis
                            type="number"
                            axisLine={false}
                            stroke='#a0a0a0'
                            domain={[0, 10]}
                            ticks={[0, 2.5, 5, 7.5, 10]}
                            strokeWidth={0.5}
                        />
                        <YAxis
                            type="category"
                            dataKey={this.props.YKey}
                            width={labelsWidth}
                        />
                        <Bar
                            dataKey="score"
                            animationDuration={1000}
                            label={{position: 'right', backgroundColor: '#fff'}}
                            shape={<Rectangle
                                className={classes.rectangle}
                                radius={[0, 10, 10, 0]}
                            />}
                        >
                            {
                                items.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={(function () {
                                            switch (index) {
                                                case 0:
                                                    return '#0f61a0';
                                                case 1:
                                                    return '#646464';
                                                default:
                                                    return '#a0a0a0';
                                            }
                                        })()}
                                    />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}


ResultsChart.propTypes = {
    classes: PropTypes.object.isRequired,
    optionsAndCriteria: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    app: state.app,
    optionsAndCriteria: state.optionsAndCriteria
});


export default connect(mapStateToProps, {getItems})(withStyles(styles)(ResultsChart));