import getConfig from '../config';
import * as nearAPI from 'near-api-js';
import { getWallet, getAccount } from '../utils/near-utils';

export const {
	GAS,
	networkId,
	nodeUrl, walletUrl, nameSuffix,
	contractId,
} = getConfig('testnet');

export const {
	Account,
	utils: {
		format: {
			formatNearAmount, parseNearAmount
		}
	}
} = nearAPI;

export const initNear = () => async ({ update, getState, dispatch }) => {
	const { near, wallet } = await getWallet();

	wallet.signIn = () => {
		console.log(contractId);
		wallet.requestSignIn(contractId, 'Blah Blah');
	};
	const signOut = wallet.signOut;
	wallet.signOut = () => {
		signOut.call(wallet);
		update('near', { wallet, account: null });
	};

	wallet.signedIn = wallet.isSignedIn();

	let account;
	if (wallet.signedIn) {
		account = wallet.account();
		wallet.balance = formatNearAmount((await wallet.account().getAccountBalance()).available, 2);
		await update('near', { near, wallet, account });
	}

	await update('near', { near, wallet, account });

	return { near, wallet, account };
};


export const getType = async (contractId, token_type_title) => {
	const account = await getAccount(contractId);
	try {
		return await account.viewFunction(contractId, 'nft_get_type', { token_type_title });
	} catch (e) {
		console.warn('error getType', e);
		return null;
	}
};

export const getTypeSupply = async (contractId, token_type_title) => {
	const account = await getAccount(contractId);
	try {
		return await account.viewFunction(contractId, 'nft_supply_for_type', { token_type_title });
	} catch (e) {
		console.warn('error getTypeSupply', e);
		return 0;
	}
};