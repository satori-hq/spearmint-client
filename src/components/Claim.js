import React from 'react';
import { Dialog } from './Dialog';
import './Claim.scss';

const Layout = ({ media, title, paras, buttons = [], tips = [] }) =>
	<div className="claim">
		<div className="layout">
			<div>
				<div className='background-border'>
					<div className='background'>
						<div className='image'>
							<img src={media} crossOrigin="*" />
						</div>
					</div>
				</div>
			</div>
			<div>
				{title && <h1>{title}</h1>}
				<div>
					{paras.length > 0 && paras.map((p, i) => <p key={i}>{p}</p>)}
				</div>
				<div>
					{buttons.length > 0 && buttons.map(({ label, className, onClick }, i) => label &&
						<button key={i} className={className} onClick={onClick}>{label}</button>
					)}
				</div>
				<div>
					{tips.length > 0 && tips.map((p, i) => <p key={i}>{p}</p>)}
				</div>
			</div>
		</div>
	</div>

export const Claim = (props) => {

	let {
		item, item: { media },
		theme,
		loading,
		createdAccount, claimedItem,
		accountId,
		walletUrl,
		dialog, wallet,
		handleCreateWallet, handleClaimNFT,
	} = props;

	// claimedItem = true
	// accountId = 'matt.near'

	if (claimedItem) {
		return accountId ?

			<Layout {...{
				title: theme?.claimedTitle ? theme.claimedTitle : <span>Congratulations, <span className="sparkle">{accountId}!</span></span>,
				media,
				paras: theme?.claimedParams ? theme.claimedParams : [
					'You claimed your NFT!'
				],
				buttons: [
					theme?.claimedButtons ? {
						label: theme.claimedButtons[0].label,
						onClick: () => window.open(theme.claimedButtons[0].link + '?accountId=' + accountId)
					}
					:
					{
						label: 'View NFT in NEAR Wallet',
						onClick: () => window.open(walletUrl + '/?tab=collectibles')
					}
				]
			}} />
			:
			<Layout {...{
				title: <span>NFT claimed!</span>,
				media,
				paras: [
					'This NFT has already been claimed.'
				],
				buttons: [{
					label: 'View NFTs in your NEAR Wallet',
					onClick: () => window.open(walletUrl + '/?tab=collectibles')
				}]
			}} />
			;
	}

	if (!item) {
		return !loading && <div>
			<h1>Satori</h1>
			<p>Check the link sent to you and try again.</p>
		</div>;
	}

	return <>
		{dialog && <Dialog {...dialog} />}
		{
			!accountId ?
				<Layout {...{
					title: theme?.claimTitle ? theme.claimTitle : <span>Congratulations! You received an <span className="sparkle">NFT!</span></span>,
					media,
					paras: theme?.claimParas ? theme.claimParas : [
						'Please create a NEAR wallet (or connect if you already have one) so we can deliver your NFT.'
					],
					buttons: [
						!createdAccount ? {
						label: theme?.claimButtons ? theme.claimButtons[0] : 'Create Wallet',
						onClick: handleCreateWallet
						} : {},
						{
							label: theme?.claimButtons ? theme.claimButtons[1] : 'Connect Wallet',
							className: 'outline',
							onClick: () => wallet.signIn()
						}
					],
					tips: theme?.claimTips ? theme?.claimTips : []
				}} />
				:
				<Layout {...{
					title: theme?.connectedTitle ? theme.connectedTitle(accountId) : <span>Wallet <span className="sparkle">{accountId}</span> connected!</span>,
					media,
					paras: theme?.connectedParas ? theme.connectedParas : [
						'You can now claim your NFT.'
					],
					buttons: [{
						label: theme?.connectedButtons ? theme.connectedButtons[0] : 'Claim NFT',
						onClick: handleClaimNFT
					}, !createdAccount ? {
						label: theme?.connectedButtons ? theme.connectedButtons[1] : 'Or Change Wallet',
						className: 'text',
						onClick: () => {
							wallet.signOut();
							window.location.href = window.location.href.split('?')[0];
						}
					} : {}]
				}} />
		}
	</>;

};