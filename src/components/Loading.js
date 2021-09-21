import React from 'react';

import './Loading.scss';

export const Loading = ({ className = 'bg' }) => <div className={["loading", className].join(' ')}>
	<div className="lds-loader"><div></div><div></div><div></div></div>
</div>;