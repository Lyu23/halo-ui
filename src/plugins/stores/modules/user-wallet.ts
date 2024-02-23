import { defineStore } from "pinia";

interface State {
    walletAddress: string;
    walletType: string;
}

export const userWalletAll = defineStore('address-info', {
    state: (): State => ({
      walletAddress: '',
        walletType: '',
    }),
    actions:{
      setwalletAddress(address: string) {
        this.walletAddress = address
      },
      setwalletType(Type: string) {
        this.walletType = Type
      }
    },
    persist:true
})


