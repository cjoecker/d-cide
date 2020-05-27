import React from 'react';
import {Tooltip, TooltipProps} from '@material-ui/core';

const ButtonsTooltip = (props: TooltipProps) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Tooltip placement='bottom' enterDelay={500} {...props} />
	);
};

export default ButtonsTooltip;
