<script setup>

</script>

<template>
  <el-container class="container">
    <el-header class="top-main">
      <!--
      <el-button
        type="primary"
        text
        color="#626aef"
        @click="isWalletConnect"
        >connect wallet</el-button>
      -->
      <div class="title-halo">
        <img class="title-img" src="@/assets/halo-svg.svg"/>
        <h2 class="haloTitle"> Halo</h2>
      </div>
      <div class="buttons-container">
        <template v-if="isConnect">
          <!-- Show text -->
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            :icon="InfoFilled"
            icon-color="#626aef"
            title="Are you sure to disconnect?"
            @confirm="disconnect"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button
                type="primary"
                text
                plain
                color="#626aef"
                :style="{ backgroundColor: '#0099ff', width: '143px', height: '39px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center' }"
              ><div class="addresses"><p class="address" style="color: #000000;">{{ userWallet.walletAddress }}</p></div></el-button>            </template>
          </el-popconfirm>
        </template>
        <template v-else>
          <!-- Show button -->
          <el-button
            type="primary"
            text
            plain
            color="#626aef"
            @click="connecttoWallet = true"
            :style="{ backgroundColor: '#0099ff', width: '143px', height: '39px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }"
          ><div class="addresses"><p style="color: #000000;">Connect Wallet</p></div></el-button>
        </template>
      </div>
    </el-header>
    <el-main class="custom-container">

        <el-tag
          size="large"
          type="primary" 
          effect="plain"
          style="margin: 10px 0 10px 0;"
          class="el-tag-bal"
          >
          <span style="font-family: Arial; color: rgb(22, 20, 20); font-weight: bold; font-size: 16px">Balance:</span> {{ formattedUserAmount }}Halo
        </el-tag>
        <el-tag
          size="large"
          type="primary"
          effect="plain"
          style="margin: 10px 0 10px 0;"
          class="el-tag-stake"
        >
          <p style="margin: -2px 0 5px 0;font-family: Arial; color: rgb(22, 20, 20); font-weight: bold;font-size: 16px;">Stake</p>
          <div style="display: flex;flex-direction: column;">
            <div v-for="(pool, index) in PoolsAmount" :key="index">
              <span style="font-family: Arial; color: rgb(22, 20, 20); font-weight: bold; font-size: 15px">{{ pool.stakePool }}: </span>{{ pool.amount }} Halo
            </div>
          </div>
        </el-tag>
      <p></p>
      <el-card class="work-card" >
        <el-tabs class="el-tabs" v-model="selectedTab" :stretch="true">
          <el-tab-pane label="Transfer" name="1">
            <div v-if="selectedTab === '1'" class="bordered-container">
              <el-text class="el_text" size="large" style="text-align: left;">To</el-text>
              
              <el-input v-model="ToUser" placeholder="ToUser" >
                
              </el-input>
              <div class="border"></div>
              <el-text class="el_text" size="large" style="text-align: left;">Amount</el-text>
              <el-input v-model="Amount" placeholder="Amount"></el-input>
              <div class="el_button_div">
                <el-button
                  type="primary"
                  text
                  class="el_button"
                  round
                  @click="TransFer"
                  >Transfer</el-button>
              </div>
            </div>
          </el-tab-pane>


          <el-tab-pane label="Stake" name="2">
            <!-- Content for Stake tab -->
            <div v-if="selectedTab === '2'" class="bordered-container">
              <el-text class="el_text" size="large" style="text-align: left;" >Pool</el-text>
              <el-select v-model="PoolSelect" placeholder="Pool">
                <el-option
                  v-for="item in StakePools"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span
                    style="
                      float: right;
                      color: var(--el-text-color-secondary);
                      font-size: 13px;
                    "
                    >{{ item.value }}</span
                  >
                </el-option>
              </el-select>
              <div class="border"></div>
              <el-text class="el_text" size="large" style="text-align: left;">Amount</el-text>
              <el-input v-model="stakeAmount" placeholder="Amount"></el-input>
              <div class="el_button_div">
                <el-button
                  type="primary"
                  text
                  class="el_button"
                  round
                  @click="stakeIn"
                  >Stake</el-button>
              </div>
            </div>
          </el-tab-pane>



          <el-tab-pane label="Unstake" name="3">
            <!-- Content for Unstake tab -->
            <div v-if="selectedTab === '3'" class="bordered-container">
              <el-text class="el_text" size="large" style="text-align: left;">Pool</el-text>
              <el-select v-model="PoolSelect" placeholder="Pool">
                <el-option
                  v-for="item in unStakePools"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span
                    style="
                      float: right;
                      color: var(--el-text-color-secondary);
                      font-size: 13px;
                    "
                    >{{ item.value }}</span
                  >
                </el-option>
              </el-select>

              <div class="border"></div>
              <el-text class="el_text" size="large" style="text-align: left;">Amount</el-text>
              <el-input v-model="unstakeAmount" placeholder="Amount"></el-input>
              
              <div class="el_button_div">
                <el-button
                  type="primary"
                  text
                  class="el_button"
                  round
                  @click="unstakeOut"
                  >unstake</el-button>
              </div>
            </div>
          </el-tab-pane>
          
        </el-tabs>
      </el-card>
    </el-main>

    <!--
    <div>{{ $t('common.title') }}</div>
    <button @click="switchLanguage('en')">Switch to English</button>
    <button @click="switchLanguage('zh')">Switch to Chinese</button>
    -->
    <el-dialog
      v-model="connecttoWallet"
      title="Connect Wallet"
      width="500"
      align-center
      class="dialog"
    >
    <span>Connect with wallet</span>

      <div class="dialog-footer">
        <el-button @click="connectedToeth">
          <img src="https://app.permaswap.network/assets/MetaMask-00ff814a.svg" />Metamask
        </el-button>
        <el-button @click="connectToar">
          <img src="https://app.permaswap.network/assets/arconnect-8daab209.svg" />ArConnect
        </el-button>
        <!--
        <el-button @click="connecttoWallet = false">
          Confirm
        </el-button>
        -->
      </div>

  </el-dialog>

  </el-container>
</template>





<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { ElConfigProvider, ElNotification } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import { userWalletAll } from '@/plugins/stores/modules/user-wallet'

import { ethers, providers, utils } from 'ethers';

import { halo } from 'halow'

import { Decimal } from 'decimal.js'
import BigNumber from 'bignumber.js';


const decimals = ref(18) //Current halo units


const userWallet = userWalletAll()

const locale = ref(zhCn);
const connecttoWallet = ref(false)
const switchLanguage = (lang) => {
  if (lang === 'en') {
    locale.value = en;
  } else if (lang === 'zh') {
    locale.value = zhCn;
  }
};

const isConnect = ref(false)
//Enter the contents of the box
const userAmount = ref('')
// Calculation property: Divide the userAmount amount by 10^18 and retain 4 decimals
const formattedUserAmount = computed(() => {
  if (!userAmount.value) return ''; // Handling cases where the user has not yet entered

  var a1 = 10 ** decimals.value
  let HaloAmount = new Decimal(userAmount.value).div(new Decimal(a1))

  return HaloAmount.toNumber().toFixed(4) // Keep four decimals, no rounding
});


// Number of pledge pools for users
const PoolsAmount = ref([]);

const ToUser = ref('');
const Amount = ref('');
const stakeAmount = ref(''); //Number of stake
const unstakeAmount = ref('');
const selectedTab = ref('1');

const PoolSelect = ref('');

const StakePools = [
  {
    value: 'basic',
    label: 'basic',
  },
]
const unStakePools = [
  {
    value: 'basic',
    label: 'basic',
  },
  {
    value: 'admin',
    label: 'admin',
  }
]


import { connectWallet, signer } from '@/plugins/requests/ethers-connect'
import { arConnect, arSign } from '@/plugins/requests/arweave-connect'
import { getChain, transfer, getuserToken } from '@/plugins/requests/halonode'

const fetchData = async () => {
  try {
    const data = await getChain();
    console.log('Data from API:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
    // process error
  }
};



const TransFer = async() => {
  const walletType = userWallet.walletType
  const a = (10n ** BigInt(decimals.value)).toString(); // 将 a 转换为字符串形式
  const AmountValue = Amount.value.toString(); // 将 unstakeAmount.value 转换为字符串形式
  if ( walletType === 'Eth' ) {
    const res = await halo.transferToEth(ToUser.value, (BigInt(AmountValue) * BigInt(a)).toString(), userWallet.walletAddress)
    if (res.everHash) {
      ElNotification({
        title: 'Transfer Success',
        message: `response is: ${res.everHash}`,
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Transfer Failed',
        message: `response is: ${res.response.data}`,
        type: 'error',
      })
    }
  }
  if ( walletType === 'Ar' ) {
    const res = await halo.transferToAr(ToUser.value, (Amount.value * a).toString(), userWallet.walletAddress)
    if (res.everHash) {
      ElNotification({
        title: 'Transfer Success',
        message: `response is: ${res.everHash}`,
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Transfer Failed',
        message: `response is: ${res.response.data}`,
        type: 'error',
      })
    }
  }
  // Wait 5 seconds to trigger an interface refresh
  setTimeout(() => {
    location.reload()
  }, 5000);
}
const stakeIn = async() => {
  const walletType = userWallet.walletType
  const a = (10n ** BigInt(decimals.value)).toString(); // 将 a 转换为字符串形式
  const stakeAmountValue = stakeAmount.value.toString(); // 将 unstakeAmount.value 转换为字符串形式
  if ( walletType === 'Eth' ) {
    const res = await halo.stakeEth(PoolSelect.value, (BigInt(stakeAmountValue) * BigInt(a)).toString(), userWallet.walletAddress)
    if (res.everHash) {
      ElNotification({
        title: 'Transfer Success',
        message: `response is: ${res.everHash}`,
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Transfer Failed',
        message: `response is: ${res.response.data}`,
        type: 'error',
      })
    }
  }
  if ( walletType === 'Ar' ) {
    console.log("goods")
    const res = await halo.stakeAr(PoolSelect.value, (BigInt(stakeAmount) * BigInt(a)).toString(), userWallet.walletAddress)
    if (res.everHash) {
      ElNotification({
        title: 'Transfer Success',
        message: `response is: ${res.everHash}`,
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Transfer Failed',
        message: `response is: ${res.response.data}`,
        type: 'error',
      })
    }
  }
  // Wait 5 seconds to trigger an interface refresh
  setTimeout(() => {
    location.reload()
  }, 5000);
}
const unstakeOut = async() => {
  const walletType = userWallet.walletType;
  const a = (10n ** BigInt(decimals.value)).toString(); // 将 a 转换为字符串形式
  const unstakeAmountValue = unstakeAmount.value.toString(); // 将 unstakeAmount.value 转换为字符串形式

  if (walletType === 'Eth') {
    const res = await halo.unstakeEth(PoolSelect.value, (BigInt(unstakeAmountValue) * BigInt(a)).toString(), userWallet.walletAddress);
    if (res.everHash) {
      ElNotification({
        title: 'Transfer Success',
        message: `response is: ${res.everHash}`,
        type: 'success',
      });
    } else {
      ElNotification({
        title: 'Transfer Failed',
        message: `response is: ${res.response.data}`,
        type: 'error',
      });
    }
  }
  if ( walletType === 'Ar' ) {
    const res = await halo.unstakeAr(PoolSelect.value, (BigInt(unstakeAmountValue) * BigInt(a)).toString(), userWallet.walletAddress)
    if (res.everHash) {
      ElNotification({
        title: 'Transfer Success',
        message: `response is: ${res.everHash}`,
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Transfer Failed',
        message: `response is: ${res.response.data}`,
        type: 'error',
      })
    }
  }
  // Wait 5 seconds to trigger an interface refresh
  setTimeout(() => {
    location.reload()
  }, 5000);
}

// Listen for changes to the count variable
watch(isConnect.value, () => {
  // Refresh page logic
  location.reload()
})

//metamask's eth wallet connection//
async function connectedToeth() {
  await connectWallet()
  const accounts = await ethereum.request({method: 'eth_accounts'});       
  if (accounts.length) {
    isConnect.value = true
    connecttoWallet.value = false;
    userWallet.setwalletType("Eth")
    ElNotification({
      title: 'Success',
      message: `You're connected to: ${accounts[0]}`,
    })
    isWalletConnect()
  } else {
    isConnect.value = false
    console.log("Metamask is not connected");
  }
}
async function disconnect() {
  isConnect.value = false //Cancel wallet connection
  if (window.ethereum) {
   
    await window.ethereum.on("disconnect", (error) => {
      // Handling disconnection events
    });
    
  }
  if (window.arweaveWallet) {
    await window.arweaveWallet.disconnect();
  }
  userWallet.setwalletAddress('')
  isWalletConnect();
  userAmount.value = ''
  location.reload()
}

import Arweave from 'arweave'

async function connectToar() {

  try {
    const injectedArweave = window.arweaveWallet;
    await injectedArweave.connect([
      "ACCESS_ADDRESS",
      "ACCESS_PUBLIC_KEY",
      "SIGNATURE",
      "SIGN_TRANSACTION",
      
    ]);
    const walletAddress = await injectedArweave.getActiveAddress();
    
    // Processing logic after successful connection
    connecttoWallet.value = false;
    userWallet.setwalletAddress(walletAddress)
    userWallet.setwalletType("Ar")
    isConnect.value = true
    isWalletConnect()
  } catch (error) {
    console.error('Failed to connect to Arweave wallet:', error);
    // Handling connection failures
  }
}
onMounted(() => {
  isWalletConnect();
});
      
async function isWalletConnect() {
  //const accounts = await ethereum.request({method: 'eth_accounts'});
  const userToken = getuserToken();
  userToken.then(result => {
    let userAddress = userWallet.walletAddress;
    // Check if it's an Ethernet address format
    const ethereumAddressPattern = /^0x[a-fA-F0-9]{40}$/;
    if (ethereumAddressPattern.test(userAddress)) {
      // If it's an Ethernet address, use the utils.getAddress() function to handle it
      userAmount.value = result.balances[utils.getAddress(userAddress)];
      let basicStake = new Decimal(0);
      let adminStake = new Decimal(0);
      if (result.stakes[utils.getAddress(userAddress)].basic) {
        result.stakes[utils.getAddress(userAddress)].basic.forEach(item => {
          let amount = new Decimal(item.amount);
          // Accumulate the current amount to basicStake
          basicStake = basicStake.plus(amount);
        });
        basicStake = basicStake.div(new Decimal(10).pow(decimals.value));
        
        PoolsAmount.value.push({"stakePool": "basic","amount": basicStake.toFixed(4).toString()});
      }
      if (result.stakes[utils.getAddress(userAddress)].admin) {
        result.stakes[utils.getAddress(userAddress)].admin.forEach(item => {
          let amount = new Decimal(item.amount);
          adminStake = adminStake.plus(amount);
        });
        adminStake = adminStake.div(new Decimal(10).pow(decimals.value));
        PoolsAmount.value.push({"stakePool": "admin","amount": adminStake.toFixed(4).toString()});
      }
    } else {
      // If it is not an Ethernet address, the original address is used directly
      userAmount.value = result.balances[userAddress];

      let basicStake = new Decimal(0);
      let adminStake = new Decimal(0);
      if (result.stakes[userAddress].basic) {
        result.stakes[userAddress].basic.forEach(item => {
          let amount = new Decimal(item.amount);
          // Accumulate the current amount to basicStake
          basicStake = basicStake.plus(amount);
        });
        basicStake = basicStake.div(new Decimal(10).pow(decimals.value));
        PoolsAmount.value.push({"stakePool": "basic","amount": basicStake.toFixed(4).toString()});
      }
      if (result.stakes[userAddress].admin) {
        result.stakes[userAddress].admin.forEach(item => {
          let amount = new Decimal(item.amount);
          adminStake = adminStake.plus(amount);
        });
        adminStake = adminStake.div(new Decimal(10).pow(decimals.value));
        PoolsAmount.value.push({"stakePool": "admin","amount": adminStake.toFixed(4).toString()});
      }
    }
  });
  
  
  if (userWallet.walletAddress) {
    isConnect.value = true
    console.log("You're connected to",userWallet.walletAddress);
  } else {
    isConnect.value = false;
    console.log("Metamask is not connected");
  }
  
}


</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  left: 0;
  background-color: #000000;
}
.top-main {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.custom-container {
  width: 100%; /* Set the width as needed */
  height: 100%; /* Set the height as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}


.work-card {
  height: 530px;
  width: 430px;
  background: linear-gradient(to bottom, rgba(0,50,0,0.8), rgba(0,0,0,0.2));
  border-radius: 30px;
  border: none;
}

.el-tabs {
  justify-content: center;
}

.el-tabs .el-tab-pane {
  height: 250px;
  width: 100%;
}

.addresses {
  width: 100%;
  display: flex;
  justify-content: center;
}
.address {
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-halo {
  display: flex;
  justify-content: flex-start;
  margin: 50px 0 0 10px;
  align-items: center;
}
.title-img {
  width: 9em
}
.haloTitle {
  font-size: 4.3em;
  letter-spacing: 2px;
  text-shadow: 0 0 10px skyblue, 0 0 20px skyblue, 0 0 40px skyblue, 0 0 80px skyblue, 0 0 160px skyblue;
}
.buttons-container {
  display: flex;
  justify-content: flex-end; /* Place the button on the right side of the container */
  margin: 20px 50px 0 0;
}

.bordered-container {
  display: flex;
  flex-direction: column;
}

.el_text {
  width: 100%;
  color: #1ae3f1;
  margin: 20px 0px 10px 10px;
}

.el_button_div {
  width: 100%;
  margin: 35px 0 0 0;
}
.el_button {
  background-color: #2e2c2c;
  width: 60%;
}

:deep(.dialog .el-dialog__title) {
  color: #FFFFFF;
}

:deep(.dialog) {
  background-color: #161E1B;
}

:deep(.el-tabs__item) {
  color: #dbe0e0; /* Setting the default text color for labels */
}

:deep(.el-tabs__item.is-active) {
  color: #1ae3f1;
}

.el-tag-stake {
  display: inline-flex;
  align-items: center; 
  height: 70px;
  width: 200px;
}
.el-tag-bal {
  display: inline-flex; 
  align-items: center;
  width: 200px;
}

</style>
