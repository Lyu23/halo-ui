import { getChain, transfer } from './halonode'
//import { userWalletAll } from '@/plugins/stores/modules/user-wallet'
import { ref } from 'vue'

import { arSign, signMessageAsync } from '@/plugins/requests/arweave-connect'
import { utils } from 'ethers'
//const userWallet = userWalletAll()
import { ethers, providers } from 'ethers';


export const signer = async(signMess) => {
	console.log('Wallet Signer')
	
  
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	//await provider.send("eth_requestAccounts", []);
	const signer = provider.getSigner()
	const signature = await signer.signMessage(signMess);
	return signature
	
	//const signer = ethProvider.getSigner(); // Get Signer
}


export const transferToEth = async(ToUser,Amount,userAddress) => {
	try {
		const action = 'transfer'
		const chainMes = await getChain();
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
	const a = await signer(Mes)
	
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
export const transferToAr = async(ToUser,Amount,userAddress) => {
	try {
		const action = 'transfer'
		const chainMes = await getChain();
		const params = {
			"to": ToUser,
			"amount": Amount
		}
	const currentTimestamp = ref(Date.now())
	//let Mes = 'dapp:' + chainMes.dapp + '\n' + 'chainID:' + chainMes.chainID + '\n' + 'action:' + action + '\n' + 'from:' + ToUser + '\n' + 'fee:' + chainMes.fee + '\n' + 'feeRecipient:' + chainMes.feeRecipient + '\n' + 'nonce:' + chainMes.nonce + '\n' + 'version:' + chainMes.version + '\n' + 'params:' + chainMes.params + '\n'
	const Mes = 'dapp:' + chainMes.dapp + '\n' +
			'chainID:' + chainMes.chainID + '\n' +
			'action:' + action + '\n' +
			'from:' + userAddress + '\n' +
			'fee:' + '0' + '\n' +
			'feeRecipient:' + chainMes.feeRecipient.toString() + '\n' +
			'nonce:' + currentTimestamp.value.toString() + '\n' +
			'version:' + 'v1' + '\n' +
			'params:' + JSON.stringify(params) + '\n';


	//const a = await signer(Mes)
	const address = "test"
	const a = await signMessageAsync ('false', 'use_wallet', address, Mes)
	console.log("sign:",a)
	const postData = {
		"action": "transfer",
		"params": JSON.stringify(params),
		"sig": a,
		"from": userAddress,
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
		console.log("-----test1bads");
		console.error(error);
		return error
	}

  
	} catch (error) {
	  console.error('Error fetching data:', error)
	}
}







export const stakeEth = async(Pool,Amount,userAddress) => {
	try {
		const action = 'stake'
		const chainMes = await getChain();
		const params = {
			"stakePool": Pool,
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
	const a = await signer(Mes)
	console.log(a)

	const postData = {
		"action": "stake",
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
		console.log("-----test1bads");
		console.error(error);
		return error
	}
	  //console.log("Mes:",Mes)
	  //console.log('Data from API:', chainMes);
  
  
  
	} catch (error) {
	  console.error('Error fetching data:', error)
	}
}

export const stakeAr = async(Pool,Amount,userAddress) => {
	try {
		const action = 'stake'

		const chainMes = await getChain();
		const params = {
			"stakePool": Pool,
			"amount": Amount
		}
	const currentTimestamp = ref(Date.now())
	//let Mes = 'dapp:' + chainMes.dapp + '\n' + 'chainID:' + chainMes.chainID + '\n' + 'action:' + action + '\n' + 'from:' + ToUser + '\n' + 'fee:' + chainMes.fee + '\n' + 'feeRecipient:' + chainMes.feeRecipient + '\n' + 'nonce:' + chainMes.nonce + '\n' + 'version:' + chainMes.version + '\n' + 'params:' + chainMes.params + '\n'
	const Mes = 'dapp:' + chainMes.dapp + '\n' +
			'chainID:' + chainMes.chainID + '\n' +
			'action:' + action + '\n' +
			'from:' + userAddress + '\n' +
			'fee:' + '0' + '\n' +
			'feeRecipient:' + chainMes.feeRecipient.toString() + '\n' +
			'nonce:' + currentTimestamp.value.toString() + '\n' +
			'version:' + 'v1' + '\n' +
			'params:' + JSON.stringify(params) + '\n';

	const address = "test"

	const a = await signMessageAsync ('false', 'use_wallet', address, Mes)
	console.log(a)

	const postData = {
		"action": "stake",
		"params": JSON.stringify(params),
		"sig": a,
		"from": userAddress,
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
		console.log("-----test1bads");
		console.error(error);
		return error
	}
	  //console.log("Mes:",Mes)
	  //console.log('Data from API:', chainMes);
  
  
  
	} catch (error) {
	  console.error('Error fetching data:', error)
	}
}




export const unstakeEth = async(Pool,Amount,userAddress) => {
	try {
		const action = 'unstake'
		const chainMes = await getChain();
		const params = {
			"stakePool": Pool,
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
	const a = await signer(Mes)


	const postData = {
		"action": "unstake",
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
		console.log("-----test1bads");
		console.error(error);
		return error
	}
	  //console.log("Mes:",Mes)
	  //console.log('Data from API:', chainMes);
  
  
  
	} catch (error) {
	  console.error('Error fetching data:', error)
	}
}

export const unstakeAr = async(Pool,Amount,userAddress) => {
	try {
		const action = 'unstake'
		const chainMes = await getChain();
		const params = {
			"stakePool": Pool,
			"amount": Amount
	}
	const currentTimestamp = ref(Date.now())
	//let Mes = 'dapp:' + chainMes.dapp + '\n' + 'chainID:' + chainMes.chainID + '\n' + 'action:' + action + '\n' + 'from:' + ToUser + '\n' + 'fee:' + chainMes.fee + '\n' + 'feeRecipient:' + chainMes.feeRecipient + '\n' + 'nonce:' + chainMes.nonce + '\n' + 'version:' + chainMes.version + '\n' + 'params:' + chainMes.params + '\n'
	const Mes = 'dapp:' + chainMes.dapp + '\n' +
			'chainID:' + chainMes.chainID + '\n' +
			'action:' + action + '\n' +
			'from:' + userAddress + '\n' +
			'fee:' + '0' + '\n' +
			'feeRecipient:' + chainMes.feeRecipient.toString() + '\n' +
			'nonce:' + currentTimestamp.value.toString() + '\n' +
			'version:' + 'v1' + '\n' +
			'params:' + JSON.stringify(params) + '\n';
	const address = "test";
	const a = await signMessageAsync ('false', 'use_wallet', address, Mes)
	console.log(a)

	const postData = {
		"action": "unstake",
		"params": JSON.stringify(params),
		"sig": a,
		"from": userAddress,
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
		console.log("-----test1bads");
		console.error(error);
		return error
	}
	  //console.log("Mes:",Mes)
	  //console.log('Data from API:', chainMes);
  
  
  
	} catch (error) {
	  console.error('Error fetching data:', error)
	}
}

export default {
    transferToEth,
    transferToAr,
	stakeEth,
	stakeAr,
	unstakeEth,
	unstakeAr,
}