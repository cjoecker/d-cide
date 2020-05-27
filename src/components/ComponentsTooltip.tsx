import React from 'react';
import {Tooltip} from '@material-ui/core';

type ComponentsTooltipProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: React.ReactElement<any, any>;
	title?: string;
};

const ComponentsTooltip = (props: ComponentsTooltipProps) => {
	const {children, title} = props;

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Tooltip title={title == null ? children.props['aria-label'] : title} placement='bottom' enterDelay={500} {...props}>
			{children}
		</Tooltip>
	);
};

export default ComponentsTooltip;
