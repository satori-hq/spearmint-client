import getConfig from '../config';
import { get } from '../utils/storage';

/// Where are we?
let ENV = subdomain?.split('-')[1]
const subdomain = window.location.host.split('.')[0]
if (!ENV) ENV = window.location.hash.split('?ENV=')[1]
if (!ENV || !/dev|testnet|mainnet/.test(ENV)) ENV = subdomain === 'sc' ? 'mainnet' : 'testnet'

export const env = ENV

export const {
	GAS,
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractName, contractMethods
} = getConfig(ENV);

const API_URL = `https://spearmint-${ENV}.near.workers.dev/v1/`

export const fetchJson = ({ url, method = 'GET', body = {} }) =>
	fetch(/http/g.test(url) ? url : API_URL + url, {
		method,
		headers: new Headers({ 'content-type': 'application/json' }),
		body: method === 'POST' ? JSON.stringify(body) : undefined
	}).then(async (res) => {
		const { ok, status } = res;
		if (!ok) {
			let error = await res.text();
			try {
				error = JSON.parse(error);
			} catch (e) {
				console.warn(e);
			}
			if (error.error) error = error.error
			throw { status, error };
		}
		if (status === 204) {
			return null;
		}
		return await res.json();
	});


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
	console.log(account, contractId, body);
	return {
		...body,
		accountId: account.accountId,
		contractId,
		...(await getSignature(account))
	};
};
