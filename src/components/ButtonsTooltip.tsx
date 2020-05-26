import React from 'react';
import {Tooltip} from '@material-ui/core';

type ButtonsTooltipProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: React.ReactElement<any, any>;
};

const ButtonsTooltip = (props: ButtonsTooltipProps) => {
	const {children} = props;

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Tooltip title={children.props['aria-label']} enterDelay={500} arrow {...props}>
			{children}
		</Tooltip>
	);
};

export default ButtonsTooltip;
