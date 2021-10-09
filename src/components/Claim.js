import React from 'react';
import { Dialog } from './Dialog';
import './Claim.scss';

const Layout = ({ media, title, paras, buttons = [] }) =>
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
					{paras.length && paras.map((p, i) => <p key={i}>{p}</p>)}
				</div>
				<div>
					{buttons.length > 0 && buttons.map(({ label, className, onClick }, i) => label &&
						<button key={i} className={className} onClick={onClick}>{label}</button>
					)}
				</div>
			</div>
		</div>
	</div>

export const Claim = (props) => {

	const {
		item, item: { media },
		loading,
		createdAccount, claimedItem,
		accountId,
		walletUrl,
		dialog, wallet,
		handleCreateWallet, handleClaimNFT,
	} = props;

	if (claimedItem) {
		return accountId ?

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
			}} />
			:

			<Layout {...{
				title: <span>NFT claimed!</span>,
				media,
				paras: [
					'This NFT was already claimed.'
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
				}} />
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
				}} />
		}
	</>;

};