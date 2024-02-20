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

        const buf = new Uint8Array(Object.values(signature))
        const signatureB64url = Arweave.utils.bufferTob64Url(buf)

        return signatureB64url
        // 连接成功后的处理逻辑
    } catch (error) {
        console.error('Failed to connect to Arweave wallet:', error);
        // 处理连接失败的情况
    }    
}