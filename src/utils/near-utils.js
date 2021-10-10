import getConfig from '../config';
import * as nearAPI from 'near-api-js';

import { env } from './api-utils'

export const {
	GAS,
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractId, contractMethods
} = getConfig(env);

const {
	Near,
	Account,
	Contract,
	InMemorySigner,
} = nearAPI;

const near = new Near({
	networkId, nodeUrl, walletUrl, 
	deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
});

export function getAccount(accountId) {
	return new Account(near.connection, accountId);
}

export function getContract(account) {
	return new Contract(account, contractId, { ...contractMethods });
}

export const getWallet = async () => {
	const wallet = new nearAPI.WalletAccount(near);
	return { near, wallet };
};

export const createAccessKeyAccount = (near, key) => {
	key.toString = () => key.secretKey;
	near.connection.signer.keyStore.setKey(networkId, contractId, key);
	const account = new Account(near.connection, contractId);
	return account;
};

export const hasKey = async (near, accountId, publicKey) => {
	const pubKeyStr = publicKey.toString();
	const account = new nearAPI.Account(near.connection, accountId);
	try {
		const accessKeys = await account.getAccessKeys();
		if (accessKeys.length > 0 && accessKeys.find(({ public_key }) => public_key === pubKeyStr)) {
			return true;
		}
	} catch (e) {
		console.warn(e);
	}
	return false;
};

export const isAccountTaken = async (accountId) => {
	const account = new nearAPI.Account(near.connection, accountId);
	try {
		await account.state();
		return true;
	} catch (e) {
		if (!/does not exist/.test(e.toString())) {
			throw e;
		}
	}
	return false;
};

export const getContractSigner = async ({ keyPair }) => {
	const signer = await InMemorySigner.fromKeyPair(networkId, contractId, keyPair);
	const near = await nearAPI.connect({
		networkId, nodeUrl, walletUrl, deps: { keyStore: signer.keyStore },
	});
	const account = new nearAPI.Account(near.connection, contractId);
	const contract = await new nearAPI.Contract(account, contractId, {
		changeMethods: ['send', 'claim', 'create_account_and_claim'],
		sender: account
	});
	return { contract };
};