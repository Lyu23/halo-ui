<script setup>

</script>

<template>
  <el-container class="container">
    <el-header class="top-main">
      <el-button
        type="primary"
        text
        color="#626aef"
        @click="test"
        >connect wallet</el-button>
      <div class="buttons-container">
        <template v-if="isConnect">
          <!-- 显示文本 -->
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
                :style="{ backgroundColor: '#0099ff', width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center' }"
              ><div class="addresses"><p class="address">{{ userWallet.walletAddress }}</p></div></el-button>            </template>
          </el-popconfirm>
        </template>
        <template v-else>
          <!-- 显示按钮 -->
          <el-button
            type="primary"
            text
            plain
            color="#626aef"
            @click="connecttoWallet = true"
            :style="{ backgroundColor: '#0099ff', width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }"
          >Connect Wallet</el-button>
        </template>
      </div>
    </el-header>
    <el-main class="custom-container">
      <el-tag size="large" :type="primary" effect="plain">userToken: {{ userAmount }}</el-tag>
      <p></p>
      <el-card class="work-card" >
        <el-tabs class="el-tabs" v-model="selectedTab" stretch="true">
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
                  v-for="item in Pools"
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
                  v-for="item in Pools"
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
    <button @click="switchLanguage('zh')">切换到中文</button>
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
          <img src="https://app.permaswap.network/assets/MetaMask-00ff814a.svg"/>Metamask
        </el-button>
        <el-button @click="connectToar">
          Ar
        </el-button>
        <el-button @click="connecttoWallet = false">
          Confirm
        </el-button>
      </div>

  </el-dialog>
  </el-container>
</template>





<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElConfigProvider, ElNotification } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import { userWalletAll } from '@/plugins/stores/modules/user-wallet'

import { ethers, providers, utils } from 'ethers';

import { transferToEth, transferToAr, stakeEth, stakeAr, unstakeEth, unstakeAr } from '../plugins/requests/request'

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
//输入框中内容
const userAmount = ref('')
const ToUser = ref('');
const Amount = ref('');
const stakeAmount = ref(''); //质押的数量
const unstakeAmount = ref('');
const selectedTab = ref('1');
//选中的pool
const PoolSelect = ref('');

const Pools = [
  {
    value: 'basic',
    label: 'basic',
  },
  {
    value: 'dev',
    label: 'dev',
  },
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
    // 处理错误
  }
};

const TransFer = async() => {
  const walletType = userWallet.walletType
  if ( walletType === 'Eth' ) {
    const res = await transferToEth(ToUser.value, Amount.value)
    ElNotification({
      title: 'Transfer Success',
      message: `response is: ${res.everHash}`,
    })
  }
  if ( walletType === 'Ar' ) {
    const res = await transferToAr(ToUser.value, Amount.value)
    ElNotification({
      title: 'Transfer Success',
      message: `response is: ${res.everHash}`,
    })
  }
  
}
const stakeIn = async() => {
  const walletType = userWallet.walletType
  if ( walletType === 'Eth' ) {
    const res = await stakeEth(PoolSelect.value, stakeAmount.value)
    ElNotification({
      title: 'stake Success',
      message: `response is: ${res.everHash}`,
    })
  }
  if ( walletType === 'Ar' ) {
    const res = await stakeAr(PoolSelect.value, stakeAmount.value)
    ElNotification({
      title: 'Transfer Success',
      message: `response is: ${res.everHash}`,
    })
  }
}
const unstakeOut = async() => {
  const walletType = userWallet.walletType
  if ( walletType === 'Eth' ) {
    const res = await unstakeEth(PoolSelect.value, unstakeAmount.value)
    ElNotification({
      title: 'unstake Success',
      message: `response is: ${res.everHash}`,
    })
  }
  if ( walletType === 'Ar' ) {
    const res = await unstakeAr(PoolSelect.value, unstakeAmount.value)
    ElNotification({
      title: 'unstake Success',
      message: `response is: ${res.everHash}`,
    })
  }
}

// 监听 count 变量的变化
watch(isConnect.value, () => {
  // 刷新页面逻辑
  location.reload()
})

//metamask的eth钱包连接//
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
  isConnect.value = false //取消钱包连接
  if (window.ethereum) {
   
    await window.ethereum.on("disconnect", (error) => {
      // 处理断开连接事件
    });
    
  }
  if (window.arweaveWallet) {
    await window.arweaveWallet.disconnect();
  }
  userWallet.setwalletAddress('')
  isWalletConnect();
  
  userAmount.value = ''
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
    
    // 连接成功后的处理逻辑
    connecttoWallet.value = false;
    userWallet.setwalletAddress(walletAddress)
    userWallet.setwalletType("Ar")
    isConnect.value = true
    isWalletConnect()
  } catch (error) {
    console.error('Failed to connect to Arweave wallet:', error);
    // 处理连接失败的情况
  }
}
onMounted(() => {
  isWalletConnect();
});
      
async function isWalletConnect() {
  //const accounts = await ethereum.request({method: 'eth_accounts'});
  const userToken = getuserToken();

  userToken.then(result => {
    userAmount.value = result.balances[utils.getAddress(userWallet.walletAddress)]
  });
  
  /*
  if (accounts.length) {
    isConnect.value = true
    console.log(`You're connected to: ${accounts[0]}`);
  } else {
    isConnect.value = false;
    console.log("Metamask is not connected");
  }
  */
}

const test = async() => {
  const a = await arSign()
  
  
}

</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  left: 0;
  border: 5px solid #000000
}
.top-main {
  width: 100%;
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

.buttons-container {
  display: flex;
  justify-content: flex-end; /* 将按钮放置在容器的右侧 */
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
  color: #dbe0e0; /* 设置标签默认文字颜色 */
}

:deep(.el-tabs__item.is-active) {
  color: #1ae3f1;
}
</style>
