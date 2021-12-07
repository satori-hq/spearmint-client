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
		claimTitle: <span>Congrats! You will get the first clue as an NFT after you create (or connect) a NEAR Wallet!</span>,
		claimParas: [
			'Satori is creating custom wallets and NFTs for all FNMeka fans!',
			'Create one now and get that clue!',
		],
		claimButtons: [
			'Create Wallet to Get Clue',
			'Claim Clue With an Existing Wallet',
		],
		claimTips: [
			<span>*In the metaverse, your wallet is where you can keep your digital items.</span>
		],

		connectedTitle: (accountId) => <span>Awesome! <span className="sparkle">{ accountId }</span> is your chosen Wallet!</span>,
		connectedParas: ['One more step...'],
		connectedButtons: [
			'Claim Clue with Wallet',
			'Change Wallet',
		],

		claimedTitle: <span>Nice job, you got the clue <span className="sparkle">GenC NFT!</span></span>,
		claimedParas: [
			`Now, return to the FNMeka Creator's Pen Challenge`,
		],
		claimedButtons: [{
			label: 'Return to Challenge ',
			link: 'https://fnmeka.satori.art'
		}],
	}
}