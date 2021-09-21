import getConfig from '../config';
import * as nearAPI from 'near-api-js';
import { get } from '../utils/storage';
import { API_ROUTE } from '../state/app'

export const {
	GAS,
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractName, contractMethods
} = getConfig('testnet');

export const getSignature = async (account, key) => {
	const { accountId } = account;
	const block = await account.connection.provider.block({ finality: 'final' });
	const blockNumber = block.header.height.toString();
	const signer = account.inMemorySigner || account.connection.signer;
	const signed = await signer.signMessage(Buffer.from(blockNumber), accountId, networkId);
	const blockNumberSignature = Buffer.from(signed.signature).toString('base64');
	return { blockNumber, blockNumberSignature };
};

export const bodyWithSig = async (account, contractId, body) => {
	console.log(account, contractId, body)
	return {
		...body,
		accountId: account.accountId,
		contractId,
		...(await getSignature(account))
	}
};

export const fetchJsonWithTwitter = ({ url, method, body }) => {
	const accessToken = get('accessToken', null);
	if (!accessToken) return
	return fetchJson({ url: url + '?accessToken=' + accessToken, method, body })
};

export const fetchJson = ({ url, method = 'GET', body = {} }) => fetch(API_ROUTE + url, {
	method,
	headers: new Headers({ 'content-type': 'application/json' }),
	body: method === 'POST' ? JSON.stringify(body) : undefined
}).then(async (res) => {
	const { ok, status } = res
	if (!ok) {
		let error = await res.text();
		try {
			error = JSON.parse(error);
		} catch (e) {
			console.warn(e)
		}
		throw { status, error }
	}
	if (status === 204) {
		return null;
	}
	return await res.json()
});
