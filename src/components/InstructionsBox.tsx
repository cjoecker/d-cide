import React, {useEffect, useState} from 'react';
import {Button, IconButton, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

export interface StyleProps {
	xPos: number;
	arrowAlignRight?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
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
		'&::after': {
			content: "''",
			position: 'absolute',
			left: ({xPos, arrowAlignRight}) => (!arrowAlignRight ? theme.spacing(xPos) : null),
			right: ({xPos, arrowAlignRight}) => (arrowAlignRight ? theme.spacing(xPos) : null),
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
	linkButton: {
		textTransform: 'none',
		textDecoration: 'underline',
		marginTop: theme.spacing(-0.5),
		fontWeight: 'normal',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	typography: {
		margin: theme.spacing(0, 0, 0, 2),
	},
}));

type ComponentsTooltipProps = {
	text: JSX.Element;
	show: boolean;
	arrowXPos: number;
	arrowAlignRight?: boolean;
};

const InstructionsBox = (props: ComponentsTooltipProps) => {
	const {text, show, arrowXPos, arrowAlignRight} = props;

	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		setIsVisible(show);
	}, [show]);

	const classes = useStyles({xPos: arrowXPos, arrowAlignRight});

	return (
		<>
			{isVisible && (
				<div className={classes.instructionsBox}>
					<Grid container justify='flex-start' alignContent='flex-start'>
						<Grid item xs={10}>
							<div className={classes.typography}>
								<Typography component='span' variant='body1' align='left' color={'secondary'}>
									{text}
								</Typography>
							</div>
						</Grid>
						<Grid item xs={2}>
							<IconButton aria-label='delete' className={classes.closeButton} onClick={() => setIsVisible(false)}>
								<CloseIcon fontSize='small' />
							</IconButton>
						</Grid>
						<Grid item xs={12}>
							<Button
								className={classes.linkButton}
								data-testid='dontShowMoreHelp'
								onClick={() => setIsVisible(false)}
								color='primary'
							>
								Don&apos;t show more help
							</Button>
						</Grid>
					</Grid>
				</div>
			)}
		</>
	);
};

export default InstructionsBox;
