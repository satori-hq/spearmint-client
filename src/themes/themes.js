
const sluggaBullet = {display: 'inline-block', width: 24, height: 24, border: '2px solid #DBA119', marginRight: 8, borderRadius: 12 }

export const themes = {
	hol: {
		css: () => import('./theme-hol.scss'),
		claimTitle: <span>NFCastle Patronage <span className="sparkle">Confirmed!</span></span>,
		claimedParas: [
			`You've successfully claimed your NFCastle Patron NFT.`,
		],
	},
	astro: {
		css: () => import('./theme-astro.scss'),
		claimTitle: <span>Astro DAO <span className="sparkle">Launch NFT!</span></span>,

		successMsg: [
			`Congratulations, now create a proposal to become a member of the Astro DAO`,
		],
		claimedButtons: [{
			label: 'Join the DAO',
			link: 'https://app.astrodao.com/dao/meet-vote-fund.sputnik-dao.near'
		}],
	},
	genc: {
		claimTitle: <span>Congrats! Here's your <span className="sparkle">GenC Digital Passport (NFT)</span></span>,
		claimParas: [
			'Blockchain tools like Satori can be used in marketing to:',
			'Issue event tickets',
			'Provide access to gated websites',
			'And so much more...'
		],
		claimButtons: [
			'Create Wallet to Claim',
			'Claim with Existing Wallet',
		],
		claimTips: [
			<span>*In blockchain accounts are “wallets”, you’ll use this to log into websites, and hold your assets like NFTs and Tokens</span>
		],

		connectedTitle: (accountId) => <span>Nice! <span className="sparkle">{ accountId }</span> is connected!</span>,
		connectedParas: ['One more step...'],
		connectedButtons: [
			'Add this NFT to your wallet',
			'Or change wallet',
		],

		claimedTitle: <span>Nice job, you own a <span className="sparkle">GenC NFT!</span></span>,
		claimedParas: [
			'Now, Register to compete for $1M+ in GenC marketing bounties',
		],
		claimedButtons: [{
			label: 'Compete in GenC',
			link: 'https://generationcrypto.org/?utm_source=email&utm_medium=satori-sonar&utm_campaign=genc-nft'
		}],
	},
	'fnmeka-pen': {
		css: () => import('./theme-fnmeka-pen.scss'),
		imgOverride: 'https://cloudflare-ipfs.com/ipfs/bafybeicovs6tpsg6oj45lao5okwm32hnu7x4jzpnm2p7g3qrf3pcc4lt4y',
		claimTitle: <span>Your first clue is an NFT!</span>,
		claimParas: [
			'Create a NEAR wallet to claim the first clue.',
		],
		claimButtons: [
			'Create Wallet',
			'Claim with existing wallet',
		],
		claimTips: [
			<span>*In the metaverse, your wallet is where you can keep your digital items.</span>
		],

		connectedTitle: (accountId) => <span>Awesome! <span className="sparkle">{ accountId }</span> is your chosen Wallet!</span>,
		connectedParas: ['One more step...'],
		connectedButtons: [
			'Claim Clue',
			'Change Wallet',
		],

		claimedTitle: <span>Nice job, you got the clue!</span>,
		claimedParas: [
			`Now, return to the FNMeka Creator's Pen Challenge`,
		],
		claimedButtons: [{
			label: 'Return to Challenge ',
			link: 'https://fnmeka.satori.art'
		}],
	},
	'slugga-originals': {
		css: () => import('./theme-slugga-originals.scss'),
		videoOverride: 'https://cdn.shopify.com/s/files/1/0127/9777/1840/files/Slugga_3DNFT.mp4?v=1639461276',
		claimTitle: <span>Claim your NFT to view exclusive content in the Slugga Vault</span>,
		claimParas: [
			'Here’s what you have to do to get it:',
			<span><span style={sluggaBullet}></span><span>Create/Connect NEAR Wallet</span></span>,
			<span><span style={sluggaBullet}></span><span>Claim NFT</span></span>,
			<span><span style={sluggaBullet}></span><span>Visit iLLtownSluggaz.com to use your NFT</span></span>,
		],
		claimButtons: [
			'Create Wallet',
			'Claim with existing wallet',
		],

		// connectedTitle: (accountId) => <span>Awesome! <span className="sparkle">{ accountId }</span> is your chosen Wallet!</span>,
		// connectedParas: ['One more step...'],
		// connectedButtons: [
		// 	'Claim Clue',
		// 	'Change Wallet',
		// ],

		// claimedTitle: <span>Nice job, you got the clue!</span>,
		// claimedParas: [
		// 	`Now, return to the FNMeka Creator's Pen Challenge`,
		// ],
		// claimedButtons: [{
		// 	label: 'Return to Challenge ',
		// 	link: 'https://fnmeka.satori.art'
		// }],
	}
}