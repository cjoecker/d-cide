import React from 'react';
import {Link} from '@material-ui/core';
/* eslint-disable */

const PrivacyTexts = (
	<div>
		<h2
			style={{
				textAlign: 'left',
			}}
		>
			Cookie Consent
		</h2>
		<p>
			<b>We don't save your data!</b> It stays inside of your computer and belongs only to you. We only use cookies to
			analyze our traffic and user experience. To be sure of what we do, you can check the full code of this app in the{' '}
			<Link href='https://github.com/cjoecker/d-cide' underline='always'>
				GitHub repository
			</Link>
			. By using this website, you accept that we use cookies.
		</p>
	</div>
);

export default PrivacyTexts;