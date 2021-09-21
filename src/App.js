import React, { useContext, useState, useEffect } from 'react';

import { useHistory, pathAndArgs } from './utils/history';
import { appStore, onAppMount } from './state/app';

import { Loading } from './components/Loading';
import { Footer } from './components/Footer';
import { ClaimRoute } from './components/ClaimRoute';

import './App.scss';

const App = () => {
	const { state, dispatch, update } = useContext(appStore);
	const { dialog, loading, event } = state.app;

	useHistory(() => {
		window.scrollTo(0, 0);
		update('app', {
			href: window.location.href,
			isMenuOpen: false,
			isEditionOpen: false,
		});
	}, true);
	const pathVars = pathAndArgs();
	const { path } = pathVars;
	
	const onMount = async () => {
		await dispatch(onAppMount(pathVars));
	};
	useEffect(onMount, []);
	
	const props = {
		state, dispatch, update,
		...pathVars,
	};


	return (
		<>
			{ loading && <Loading />}
			<ClaimRoute {...props} />
			<Footer />
		</>
	);
};

export default App;
