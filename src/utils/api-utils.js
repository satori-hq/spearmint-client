import getConfig from '../config';
import { get } from '../utils/storage';

export const {
	GAS,
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractName, contractMethods
} = getConfig('testnet');

let ENV = window.location.host.split('.')[0]?.split('-')[1]
/// TODO switch to mainnet
if (!ENV) ENV = window.location.hash.split('?ENV=')[1]
if (!ENV) ENV = 'testnet'
const API_URL = `https://spearmint-${ENV}.near.workers.dev/v1/`

console.log(API_URL)

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
