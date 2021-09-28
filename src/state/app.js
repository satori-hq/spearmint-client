import { State } from '../utils/state';
import { fetchJson } from '../utils/api-utils';
import { get, set } from '../utils/storage'

import { initNear, getType } from './near';
// example
const initialState = {
	app: {
		dialog: null,
		loading: true,
		mounted: false,
		clicked: false,
	},
	item: null,
	near: {},
};

export const API_ROUTE = 'https://spearmint.satori.art/v1/';
export const IPFS_ROUTE = 'https://cloudflare-ipfs.com/ipfs/';
export const API_SERVER = process.env.REACT_APP_API_SERVER;
export const ITEM_KEY = '__ITEM_';
export const { appStore, AppProvider } = State(initialState, 'app');

export const onAppMount = ({ path, args, pathArgs }) => async ({ update, getState, dispatch }) => {
	dispatch(initNear());
	update('app', { loading: false });
};

export const getItem = (code) => async ({ update, getState, dispatch }) => {
	let item = get(ITEM_KEY + code, null)

	// media in localStorage?
	const media = item?.media
	// get new item state
	try {
		/// TODO should we throw this in a post with body call so logs don't scoop it?
		item = await fetchJson({
			url: `claim/${code}/get`
		});
	} catch(e) {
		if (e.error !== 'no claim') throw e
	}

	if (!item) return null

	item.media = media ? media : IPFS_ROUTE + (await getType(item.contractId, item.title)).metadata.media;
	set(ITEM_KEY + code, item)
	update('item', item);
	return item;
};

export const setDialog = (dialog) => async ({ update }) => {
	return new Promise((resolve, reject) => {
		dialog.resolve = async(res) => {
			resolve(res);
			update('app', { dialog: null });
		};
		dialog.reject = async() => {
			// reject('closed by user')
			update('app', { dialog: null });
		};
		update('app', { dialog });
	});
};

/// helpers
