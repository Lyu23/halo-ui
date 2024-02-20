declare global {
    interface Window {
        arweaveWallet?: any; // 适配实际情况，ethereum 可能是对象或 undefined
    }
}


import sha256 from 'crypto-js/sha256'

import Arweave from 'arweave'
export const arConnect = async(token: string) => {
    const injectedArweave = window.arweaveWallet;
    await injectedArweave.connect([
        "ACCESS_PUBLIC_KEY",
        "SIGNATURE",
        "SIGN_TRANSACTION",
    ]);

}




export const arSign = async(signMes) => {
    const options = {
        host: 'arweave.net', // Hostname or IP address for a Arweave host
        port: 443, // Port
        protocol: 'https', // Network protocol http or https
        timeout: 20000, // Network request timeouts in milliseconds
        logging: false // Enable network request logging
    }
    try {
        
        const hexToUint8Array = (hexString: string): Uint8Array =>
            Uint8Array.from((hexString.match(/.{1,2}/g) as any).map((byte: any) => parseInt(byte, 16)))

        const algorithm = {
            name: 'RSA-PSS',
            saltLength: 32
        }

        const injectedArweave = window.arweaveWallet;
        await injectedArweave.connect([
          "ACCESS_PUBLIC_KEY",
          "SIGNATURE",
          "SIGN_TRANSACTION",
        ]);
        
        //const msgDataBuffer = "test"
        const arweave = Arweave.init(options)
        console.log(signMes)
        const msgDataBuffer = Buffer.from(signMes, 'utf-8')

        const hash = sha256(msgDataBuffer)

        //const msgDataBuffer = Buffer.from("test", 'utf-8')
        //const msgDataBuffer = new TextEncoder().encode(signMes);

        const signature = await (window.arweaveWallet).signature(
            hexToUint8Array(hash.toString()),
            algorithm
        )
        
        /*
        const signature = await window.arweaveWallet.signMessage(
          msgDataBuffer,
          { hashAlgorithm: 'SHA-256' }
        )
        */
        let arOwner = await (window.arweaveWallet).getActivePublicKey()
        const buf = new Uint8Array(Object.values(signature))
        const signatureB64url = Arweave.utils.bufferTob64Url(buf)
        
        const ares = signatureB64url + ',' + arOwner
        return ares
        // 连接成功后的处理逻辑
    } catch (error) {
        console.error('Failed to connect to Arweave wallet:', error);
        // 处理连接失败的情况
    }    
}
const options = {
    host: 'arweave.net', // Hostname or IP address for a Arweave host
    port: 443, // Port
    protocol: 'https', // Network protocol http or https
    timeout: 20000, // Network request timeouts in milliseconds
    logging: false // Enable network request logging
}
enum ERRORS {
    PLEASE_INSTALL_ARCONNECT = 'PLEASE_INSTALL_ARCONNECT',
    ACCESS_ADDRESS_PERMISSION_NEEDED = 'ACCESS_ADDRESS_PERMISSION_NEEDED',
    ACCESS_PUBLIC_KEY_PERMISSION_NEEDED = 'ACCESS_PUBLIC_KEY_PERMISSION_NEEDED',
    SIGNATURE_PERMISSION_NEEDED = 'NEED_SIGNATURE_PERMISSION',
    SIGN_TRANSACTION_PERMISSION_NEEDED = 'SIGN_TRANSACTION_PERMISSION_NEEDED',
    SIGNATURE_FAILED = 'SIGNATURE_FAILED',
    TRANSACTION_POST_ERROR = 'TRANSACTION_POST_ERROR',
    ACCESS_PUBLIC_KEY_FAILED = 'ACCESS_PUBLIC_KEY_FAILED'
}
export const signMessageAsync = async (debug: boolean, arJWK: ArJWK, address: string, messageData: string): Promise<string> => {
    console.log("------------------giosdsodi")
    const arweave = Arweave.init(options)
    const msgDataBuffer = Buffer.from(messageData, 'utf-8')
    let arOwner = ''
    let signatureB64url = ''
    // web
    if (arJWK === 'use_wallet') {

      try {
        // TODO: wait arweave-js update arconnect.d.ts
        arOwner = await (window.arweaveWallet).getActivePublicKey()
      } catch {
        throw new Error(ERRORS.ACCESS_PUBLIC_KEY_FAILED)
      }
  
      
  
      const algorithm = {
        name: 'RSA-PSS',
        saltLength: 32
      }
  
      if ((window.arweaveWallet as any).signMessage !== undefined) {
        try {
          const signature = await (window.arweaveWallet as any).signMessage(
            msgDataBuffer,
            { hashAlgorithm: 'SHA-256' }
          )
          const buf = new Uint8Array(Object.values(signature))
          signatureB64url = Arweave.utils.bufferTob64Url(buf)
        } catch {
          throw new Error(ERRORS.SIGNATURE_FAILED)
        }
      } else {
        try {
          const hash = sha256(messageData)
          const signature = await (window.arweaveWallet).signature(
            hexToUint8Array(hash.toString()),
            algorithm
          )
          const buf = new Uint8Array(Object.values(signature))
          signatureB64url = Arweave.utils.bufferTob64Url(buf)
        } catch {
          throw new Error(ERRORS.SIGNATURE_FAILED)
        }
      }
  
    // node
    } else {
      const hash = sha256(messageData)
      const buf = await arweave.crypto.sign(arJWK, hexToUint8Array(hash.toString()), {
        saltLength: 32
      })
      arOwner = arJWK.n
      signatureB64url = Arweave.utils.bufferTob64Url(buf)
    }
  
    return `${signatureB64url},${arOwner}`
  }

/*
{"dapp":"halo",
"chainID":"1",
"everHash":"",
"router":"0x7ae421e2d5458FA9FaC04b73f086Bf8dE949F3Ab",
"action":"transfer",
"from":"G1ylJbqKaG-qL7LexEHtyKp1sgJ_Q0l52vsNvbOLRdU",
"fee":"0",
"feeRecipient":"0xc6B2FcadaEC9FdC6dA8e416B682d4915F85986f6",
"nonce":"1708431527242",
"version":"v1",
"params":"{\"to\": \"0x61EbF673c200646236B2c53465bcA0699455d5FA\", \"amount\": \"1\"}",
"sig":"CbA6fcoimbWgaNPH8bIc4hwGD1dsmOdp32E-I9Wh-m-6yh_ayHuJbJ1YXUhTPwn0Bi51V2senNCBomcNguDilN1dwaKnlly0jrpFc8DK_ES35u1kTaTW3dK3vgdeF55AQFdJJSj4hhzG4QV7PK4n1LErKycGB1ydrLREiGWJppcO5hxn4CiWMjgDLrlFNYo-krc2Eyvr5C4FdEi-JiJNiYkTzZm5JkmMnSXmRMMyY22vgs-9uLJNs-VzHvF2Wa_dYf_Hch060qZQf4eaezZgBoYcUgnu6dDutKNslsmQoK-TW5rzdBpCb6SkhOoxfI6IiN5eabbfaHiUPMSNDSZSr4BQJpEU0YnCvBmSnROFolusuylP7qsSPmrPHbPL9oaFBPDIM4y3yPdiXWi8ejThUtmbed8pRaAbDCqH3QUiBnT_DGoLvyEbRp_C8pq1SR4JKG9wbaqV7NgENonrXvcMLBXFPYRfZUxQpBwZN9Hi4723PxL9N2zIREAovIXTBj1fFtGAdM8EGzf38-IrTOfGSLcyhx0WdS0Osn1mcIckGDBsYzatOhN--M0dBng5Mc193v9Awm4uPx_Pe_dL3z5CjiNH3zUtw8ugdRjZYplhaRdRLPxXwIfWiRK2WkwIsCTz77Qw_WYgxnQmeKbsGokeiAKERMADS22esp9s8h_xyJY,1f_-tJI_qgpVrb3xcdYUKdmlcpwvCkIpMh0uCOBm3su83q69mRbY3Id9a-sv9cj6DwyivJK61usy4sG_zNLsXVSvdnS69oiSbF3cDPRs_GLSIwFUwAbhR2A3Xw5piPkOvjaGHfCWqalj5wBmJ4-SJbzRkEtL1gsQnJm4SEEnOzn4s36als0GPzxX6FZUTb_zSBPqpxLFW6rpWmyqDN7LdL9gNylaGyTEWrzL7mZ7krbzZ_Gn8ukxHb6CxwQeN-Lyq2JkGtlbr4TsNVOTw9U5S1U7lywJXmbsLBs6EJy2aKZc5WTvWUuznVy6zt7_BfbwIOFDir98fZ6Ur5X4UxDrV_JfO5aiHVAUg--XcaUZMETeGOCcmOR9PAlfkyjFI5upveK5FmxfSngjN-tSe1MEKgaXWSaZT3CkExDx88C1A580Vmy_ncICvxdlzIOPJIXVEuo07TU4S_3jHtPcH5wfQs-2vruPgdxDxTlCE-VyREIxE_m8C_38txMh9aKE8jKU8xaDf6UUl0B7XK8vvEMVqC7HrnWOoj86WMvvtbd_aIIpHSccjgPz2J6pPNDqPM23NOfTAbSsN1zMDx_oGmcKl_I-hUJDgl5TkM1DZs2y9ovSRktyAHCcSxHvHXgUrFPzCfPi7M2I2k7dhJI5EcYq3Y2Z5ix6AhS8YGSDLKrvTz0"}

*/