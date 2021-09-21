import React, { useState, useEffect } from 'react';

import { getType } from '../state/near'
import { Dialog } from './Dialog';

import './Claim.scss';

const ipfsGateway = 'https://cloudflare-ipfs.com/ipfs/'


const Layout = ({ media, title, paras, buttons }) => <div className="layout">
	<div>
		<img src={media} crossOrigin="*" />
	</div>
	<div>
		{ title && <h1>{title}</h1>}
		{ paras.length && paras.map((p, i) => <p key={i}>{p}</p>)}
		{ buttons.length && buttons.map(({ label, className, onClick }, i) => label && <>
			<button key={i}className={className} onClick={onClick}>{label}</button>
		</>)}
	</div>
</div>

export const Claim = (props) => {

	const {
		item, loading,
		createdAccount, claimedItem,
		accountId,
		walletUrl,
		dialog, wallet, 
		handleCreateWallet, handleClaimNFT,
	} = props

	const [media, setMedia] = useState(null)

	const loadItem = async () => {
		if (!item) return
		const { contractId, title } = item
		setMedia(ipfsGateway + (await getType(contractId, title)).metadata.media)
	}

	useEffect(loadItem, [item])

	if (claimedItem) {
		return accountId ? <div className="claim">

			<Layout {...{
				title: <span>Congratulations <span className="sparkle">{accountId}!</span></span>,
				media,
				paras: [
					'You claimed your NFT!'
				],
				buttons: [{
					label: 'View NFT in NEAR Wallet',
					onClick: () => window.open(walletUrl + '/?tab=collectibles')
				}]
			}}/>
		</div>
			:
			<div className="claim">
				<div>
					<h1>NFT claimed!</h1>
					{ media && <img src={media} /> }
					<p>This NFT was already claimed!</p>
				</div>
			</div>;
	}

	if (!item) {
		return !loading && <div>
			<h1>Satori</h1>
			<p>Check the link sent to you and try again.</p>
		</div>;
	}

	return <>
		{dialog && <Dialog {...dialog} />}
		<div className="claim">
			{
				!accountId ?
					<Layout {...{
						title: <span>Congratulations you <span className="sparkle">rock!</span></span>,
						media,
						paras: [
							'You need to connect or create a NEAR Wallet so we know where to send your NFT!'
						],
						buttons: [{
							label: 'Connect Wallet',
							onClick: () => wallet.signIn()
						}, !createdAccount ? {
							label: 'Create Wallet',
							className: 'outline',
							onClick: handleCreateWallet
						} : {}]
					}}/>
					:
					<Layout {...{
						title: <span>Wallet <span className="sparkle">{accountId}</span> connected!</span>,
						media,
						paras: [
							'You can now claim your NFT!'
						],
						buttons: [{
							label: 'Claim NFT',
							onClick: handleClaimNFT
						}, !createdAccount ? {
							label: 'Or Change Wallet',
							className: 'text',
							onClick: () => {
								wallet.signOut();
								window.location.href = window.location.href.split('?')[0];
							}
						} : {}]
					}}/>
			}
		</div>
	</>;
	
}