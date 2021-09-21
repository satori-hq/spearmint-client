const contractName = 'dev-1626646469827-53351318465132';

module.exports = function getConfig(network = 'mainnet') {
	let config = {
		networkId: "testnet",
		nodeUrl: "https://rpc.testnet.near.org",
		walletUrl: "https://wallet.testnet.near.org",
		helperUrl: "https://helper.testnet.near.org",
		contractName,
	};

	switch (network) {
	case 'testnet':
		config = {
			explorerUrl: "https://explorer.testnet.near.org",
			...config,
			GAS: "200000000000000",
			gas: "200000000000000",
			linkdropContractId: 'linkdrop-wrapper.testnet',
			contractId: contractName,
		};
		break;
	case 'mainnet':
		config = {
			...config,
			networkId: "mainnet",
			nodeUrl: "https://rpc.mainnet.near.org",
			walletUrl: "https://wallet.near.org",
			helperUrl: "https://helper.mainnet.near.org",
		};
		break;
	}

	return config;
};
