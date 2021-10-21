import React, { useEffect, useState } from 'react';

import { set } from '../utils/storage'
import { pathAndArgs } from '../utils/history';
import { ITEM_KEY, getItem, setDialog } from '../state/app';
import { walletUrl } from '../state/near';
import { fetchJson } from '../utils/api-utils';
import { themes } from '../themes/themes';
import confetti from 'canvas-confetti';

import { Claim } from './Claim';

import './ClaimRoute.scss';

const launchConfetti = () => confetti({
	spread: 90,
	startVelocity: 50,
	gravity: 2,
	colors: ['#2FD2E9', '#3A90F4', '#B950E3']
});

export const ClaimRoute = (props) => {
	const { state, dispatch, update } = props;
	const { item } = state;
	const { wallet, account } = state.near;
	const { dialog, loading } = state.app;
	const { pathArgs } = pathAndArgs();

	// accountId is either in searchParams or
	let accountId = window.location.href.split('?accountId=')[1]?.split('&')[0];
	if (account) {
		accountId = account.accountId;
	}

	const [theme, setTheme] = useState()

	// code is the only path param e.g. /#/code
	const code = pathArgs[0];

	const onMount = async () => {
		update('app.loading', true);
		if (!code || !code.length) return
		const item = await dispatch(getItem(code));

		/// lazy import theme here
		let { theme } = item || {}

		/// debuggin theme
		// theme = 'genc'

		if (theme && theme !== 'default') {
			setTheme(themes[theme])
			themes[theme]?.css && themes[theme].css()
		}

		update('app.loading', false);

		if (!item) {
			return dispatch(setDialog({
				msg: <div>
					<p>There was an issue finding your item.</p>
					<p>Please check the link that was sent to you and try again.</p>
				</div>,
				choices: ['Ok']
			}));
		}
	};
	useEffect(onMount, []);

	const handleCreateWallet = async () => {
		update('app.loading', true);
		let res;
		try {
			res = await fetchJson({
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
		if (!res.linkdrop) {
			return dispatch(setDialog({
				msg: <div>
					<p>There was an issue setting up your NEAR Account.</p>
					<p>Please try again.</p>
				</div>,
				choices: ['Ok']
			}));
		}

		// redirect user to wallet and then load item when they get back and mount this route
		window.location = res.linkdrop;
	};

	const handleClaimNFT = async () => {
		update('app.loading', true);
		const { contractId, title } = item;
		let res, error;
		try {
			res = await fetchJson({
				url: `/claim/body-code/nft/${contractId}/${encodeURIComponent(title)}`,
				method: 'POST',
				body: {
					code,
					receiverId: accountId
				}
			});
		} catch (e) {
			console.warn(e);
			error = e
		}
		update('app.loading', false);
		if (!res.success) {
			return dispatch(setDialog({
				msg: <div>
					<p>There was an issue claiming your NFT.</p>
					<p>Please try again.</p>
				</div>,
				choices: ['Ok']
			}));
		}
		/// TODO check if successful, get nftHash (from NEAR res) then update localStorage item to reflect this
		const newItem = { ...item, nftHash: res.res.transaction.hash }
		set(ITEM_KEY + code, newItem)
		update('item', newItem)
		update('app.loading', false);
		launchConfetti();
	};


	/// we don't want to render anything if there's no item ???
	if (!item) return null;
	const { ldHash: createdAccount, nftHash: claimedItem } = item || {};

	return <Claim {...{
		item,
		theme,
		loading,
		createdAccount,
		claimedItem,
		accountId,
		walletUrl,
		dialog, wallet,
		handleCreateWallet, handleClaimNFT,
	}} />;
};
