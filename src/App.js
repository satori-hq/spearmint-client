import React, { useContext, useState, useEffect } from 'react';

import { useHistory, pathAndArgs } from './utils/history';
import { appStore, onAppMount } from './state/app';

import { Dialog } from './components/Dialog';
import { Loading } from './components/Loading';
import { Footer } from './components/Footer';
import { ClaimRoute } from './components/ClaimRoute';

import './App.scss';

const App = () => {
	const { state, dispatch, update } = useContext(appStore);
	const { loading, dialog } = state.app;

	useHistory(() => {
		window.scrollTo(0, 0);
	}, true);
	
	const pathVars = pathAndArgs();
	
	useEffect(() => dispatch(onAppMount(pathAndArgs())), []);
	
	const props = {
		state, dispatch, update,
		...pathVars,
	};

	return (
		<>
			{ dialog && <Dialog {...dialog} />}
			{ loading && <Loading />}
			<ClaimRoute {...props} />
			<Footer />
		</>
	);
};

export default App;
