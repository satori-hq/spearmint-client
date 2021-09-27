import { State } from '../utils/state';
import { postJson, fetchJson, fetchJsonWithTwitter, bodyWithSig } from '../utils/api-utils';
import { get, set, del } from '../utils/storage';

// example
const initialState = {
	app: {
		user: null,
		dialog: null,
		loading: true,
		mounted: false,
		clicked: false,
		event: {},
	},
	item: null,
	near: {},
};

export const API_ROUTE = 'https://spearmint.satori.art/v1/';
export const IPFS_ROUTE = 'https://cloudflare-ipfs.com/ipfs/';
export const API_SERVER = process.env.REACT_APP_API_SERVER;
export const CALLBACK_ID = '__CALLBACK_ID';
export const { appStore, AppProvider } = State(initialState, 'app');

export const getItem = (code) => async ({ update, getState, dispatch }) => {

	/// TODO should we throw this in a post with body call so logs don't scoop it?
	
	const res = await fetchJson({
		url: `claim/${code}/get`
	});
	update('item', res);
	return res;
};

export const onAppMount = ({ path, args, pathArgs }) => async ({ update, getState, dispatch }) => {

	let { accessToken } = args;

	if (accessToken && accessToken.length) {
		set('accessToken', accessToken);
		// history.push(path)
		window.location.href = window.location.origin + '/#/r/' + get(CALLBACK_ID);
		window.location.reload();
	}

	if (!accessToken) {
		accessToken = get('accessToken', null);
	}

	let user;
	if (accessToken) {
		const res = await fetchJsonWithTwitter({ url: '/profile' });
		user = res.user;
	}
	
	update('app', { user, loading: false });
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
