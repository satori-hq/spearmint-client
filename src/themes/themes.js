export const themes = {
	hol: {
		css: () => import('./theme-hol.scss'),
		title: <span>NFCastle Patronage <span className="sparkle">Confirmed!</span></span>,
		successMsg: `You've successfully claimed your NFCastle Patron NFT.`
	},
	astro: {
		css: () => import('./theme-astro.scss'),
		title: <span>Astro DAO <span className="sparkle">Launch NFT!</span></span>,
		successMsg: `Congratulations, now create a proposal to become a member of the Astro DAO`,
		successButton: {
			label: 'Join the DAO',
			link: 'https://app.astrodao.com/dao/meet-vote-fund.sputnik-dao.near'
		}
	}
}