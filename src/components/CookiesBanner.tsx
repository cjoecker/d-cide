import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({});

const CookiesBanner: React.FC = () => {
	const [open, setOpen] = useState(true);

	const classes = useStyles();

	const handleClose = () => {
		ReactGA.event({
			category: 'Cookies dialog',
			action: `Close`,
		});

		setOpen(false);
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			open={open}
			onClose={handleClose}
			message={'I love candy. I love cookies. I love cupcakes. \
					I love cheesecake. I love chocolate.'}
			action={(
    <Button color='secondary' size='small'>
					lorem ipsum dolorem
				</Button>
  )}
		/>
	);
};

export default CookiesBanner;
