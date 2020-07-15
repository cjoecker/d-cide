import React, {useEffect, useState} from 'react';
import {IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	instructionsBox: {
		color: theme.palette.background.paper,
		display: 'flex',
		backgroundColor: 'currentColor',
		position: 'relative',
		top: '0px',
		left: '0px',
		width: '100%',
		height: '100%',
		borderRadius: theme.spacing(1),
		boxShadow: '0px 0px 41px -11px rgba(0,0,0,0.7)',
		animation: `$myEffect 2000ms`,
		animationIterationCount: 'infinite',
		animationTimingFunction: 'easeInOutSine',
		'&::before': {
			content: "''",
			position: 'relative',
			left: '50%',
			top: '-14px',
			width: '0px',
			height: '0px',
			borderLeft: `7px solid transparent`,
			borderRight: `7px solid transparent`,
			borderBottom: `14px solid currentColor`,
		},
	},
	'@keyframes myEffect': {
		'0%': {
			transform: 'translateY(0%)',
		},
		'50%': {
			transform: 'translateY(-7%)',
		},
		'100%': {
			transform: 'translateY(0)',
		},
	},
	text: {
		color: 'black',
	},
	closeButton: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(-2),
		backgroundColor: theme.palette.background.paper,
		boxShadow: 'none',
	},
}));

type ComponentsTooltipProps = {
	text: JSX.Element;
	show: boolean;
};

const InstructionsBox = (props: ComponentsTooltipProps) => {
	const {text, show} = props;

	const [_show, set_show] = useState(true);

	useEffect(() => {
		set_show(show);
	}, [show]);

	const classes = useStyles();

	return (
		<>
			{_show && (
				<div className={classes.instructionsBox}>
					<Grid container justify='center' alignContent='center'>
						<Grid item xs={10}>
							<Typography component='span' variant='body1' align='left' color={'secondary'}>
								{text}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<IconButton aria-label='delete' className={classes.closeButton} onClick={() => set_show(false)}>
								<CloseIcon fontSize='small' />
							</IconButton>
						</Grid>
					</Grid>
				</div>
			)}
		</>
	);
};

export default InstructionsBox;
