function hello(name) {
    return 'hello ' + name + ', now is ' + Date();
}

import halo from './plugins/requests/request'
import { getChain, transfer } from './plugins/requests/halonode'
//import { userWalletAll } from '@/plugins/stores/modules/user-wallet'
import { ref } from 'vue'
import { connectWallet, signer } from './plugins/requests/ethers-connect'
import { arSign, signMessageAsync } from './plugins/requests/arweave-connect'
import { utils } from 'ethers'
import { ethers, providers } from 'ethers';
const halot = async(ToUser,Amount,userAddress, chainMes) => {
	try {
		const action = 'transfer'
		
		const params = {
			"to": ToUser,
			"amount": Amount
		}
		
	const currentTimestamp = ref(Date.now())
	//let Mes = 'dapp:' + chainMes.dapp + '\n' + 'chainID:' + chainMes.chainID + '\n' + 'action:' + action + '\n' + 'from:' + ToUser + '\n' + 'fee:' + chainMes.fee + '\n' + 'feeRecipient:' + chainMes.feeRecipient + '\n' + 'nonce:' + chainMes.nonce + '\n' + 'version:' + chainMes.version + '\n' + 'params:' + chainMes.params + '\n'
	const Mes = 'dapp:' + chainMes.dapp + '\n' +
			'chainID:' + chainMes.chainID + '\n' +
			'action:' + action + '\n' +
			'from:' + utils.getAddress(userAddress) + '\n' +
			'fee:' + '0' + '\n' +
			'feeRecipient:' + chainMes.feeRecipient.toString() + '\n' +
			'nonce:' + currentTimestamp.value.toString() + '\n' +
			'version:' + 'v1' + '\n' +
			'params:' + JSON.stringify(params) + '\n';
	//const a = await signer(Mes)
	
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const a = await signer.signMessage(Mes);

	const postData = {
		"action": "transfer",
		"params": JSON.stringify(params),
		"sig": a,
		"from": utils.getAddress(userAddress),
		"dapp": chainMes.dapp,
		"chainID": chainMes.chainID,
		"nonce": currentTimestamp.value.toString(),
		"version": "v1",
		"feeRecipient": chainMes.feeRecipient.toString(),
		"fee": "0"
	}

	try {
		const response = await transfer(JSON.stringify(postData));
		// Processing Response
		return response
	} catch (error) {
		// process error
		console.error(error);
		return error
	}


	} catch (error) {
	  console.error('Error fetching data:', error)
	}
}

export { halo }