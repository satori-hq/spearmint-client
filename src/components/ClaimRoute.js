import React, { useContext, useState, useEffect } from 'react';

import { useHistory, pathAndArgs } from '../utils/history';
import { getItem, setDialog, API_ROUTE } from '../state/app';
import { initNear, walletUrl } from '../state/near';
import { fetchJson } from '../utils/api-utils';
import confetti from 'canvas-confetti';

import { Claim } from './Claim';

import './ClaimRoute.scss';

const launchConfetti = () => confetti({
	spread: 90,
	startVelocity: 50,
	gravity: 2,
	colors: ['#2FD2E9', '#3A90F4', '#B950E3']
})

export const ClaimRoute = (props) => {
	const { state, dispatch, update } = props;
	const { item } = state;
	const { wallet, account } = state.near;
	const { dialog, loading } = state.app;
	const { path, args, pathArgs } = pathAndArgs();
	console.log(pathArgs)

	let accountId = window.location.href.split('?accountId=')[1]?.split('&')[0];
	if (account) {
		accountId = account.accountId;
	}

	const code = pathArgs[0]

	useHistory(() => {
		window.scrollTo(0, 0);
		update('app', {
			href: window.location.href,
			isMenuOpen: false,
			isEditionOpen: false,
		});
	}, true);

	const onMount = async () => {
		dispatch(initNear())
		if (code && code.length) {
			update('app.loading', true);
			const item = await dispatch(getItem(code));
			update('app.loading', false);
			if (!item) {
				dispatch(setDialog({
					msg: <div>
						<p>There was an issue finding your item.</p>
						<p>Please check the link that was sent to you and try again.</p>
					</div>,
					choices: ['Ok']
				}));
			}
		}
	};
	useEffect(onMount, []);

	const handleCreateWallet = async () => {
		update('app.loading', true);
		let response;
		try {
			response = await fetchJson({
				url: '/claim/body-code/linkdrop',
				method: 'POST',
				body: {
					code,
					redirectUrl: encodeURIComponent(window.location.href)
				}
			});
		} catch (e) {
			console.warn(e);
		}
		update('app.loading', false);
		if (!response.linkdrop) {
			return dispatch(setDialog({
				msg: <div>
					<p>There was an issue setting up your NEAR Account.</p>
					<p>Please try again.</p>
				</div>,
				choices: ['Ok']
			}));
		}
		window.location = response.linkdrop;
	};

	const handleClaimNFT = async () => {
		update('app.loading', true);
		const { contractId, title } = item
		let response;
		try {
			response = await fetchJson({
				url: `/claim/body-code/nft/${contractId}/${encodeURIComponent(title)}`,
				method: 'POST',
				body: {
					code,
					receiverId: accountId
				}
			});
		} catch (e) {
			console.warn(e);
		}
		dispatch(getItem(code));
		update('app.loading', false);
		launchConfetti()
	};

	console.log(item)

	const { ldHash: createdAccount, nftHash: claimedItem } = item || {};

	return <Claim {...{
		item, loading,
		createdAccount,
		claimedItem,
		accountId,
		walletUrl,
		dialog, wallet, 
		handleCreateWallet, handleClaimNFT,
	}} />
};
