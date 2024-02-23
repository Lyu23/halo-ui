import { ethers, providers } from 'ethers';
import { userWalletAll } from '../stores/modules/user-wallet'


const userWallet = userWalletAll();


declare global {
  interface Window {
    ethereum?: any; // Adaptation, ethereum may be an object or undefined.
  }
}

export let ethProvider: ethers.providers.Web3Provider | null;

export const connectWallet = async () => {
  console.log('Connecting Wallet...');
  
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (accounts.length > 0) {
        const networkIdString = await window.ethereum.request({ method: 'net_version' });
        const networkId = parseInt(networkIdString, 10);

        if (!isNaN(networkId)) {
          // Building Infura Node URLs
          const infuraUrl = `https://mainnet.infura.io/v3/1eeb3cf85565428b819a87c6dbc6644c`;
          
          // Using Network Objects
          const network: providers.Network = { chainId: networkId, name: 'mainnet' };
          //const provider = new ethers.providers.JsonRpcProvider(window.ethereum, network);
          ethProvider = new ethers.providers.Web3Provider(window.ethereum)
          const accounts_provider = await ethProvider.listAccounts();
          await ethProvider.send("eth_requestAccounts", []);

          console.log('Connected to MetaMask. User Address:', accounts_provider[0]);
          userWallet.setwalletAddress(accounts[0]);
        } else {
          console.error('Invalid network ID:', networkIdString);
        }
      } else {
        console.error('User denied account access.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  } else {
    console.error('MetaMask not detected. Please install it.');
  }
};

export const signer = async(signMess) => {
  console.log('Wallet Signer')
  

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  //await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
  const signature = await signer.signMessage(signMess);
  return signature
  console.log(signature)
  //const signer = ethProvider.getSigner(); // Get Signer
}













