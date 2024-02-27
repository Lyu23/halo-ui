declare global {
    interface Window {
        arweaveWallet?: any; // Adaptation, ethereum may be an object or undefined.
    }
}


import sha256 from 'crypto-js/sha256'

import Arweave from 'arweave'

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


export const arConnect = async(token: string) => {
  const injectedArweave = window.arweaveWallet;
  await injectedArweave.connect([
    "ACCESS_ADDRESS",
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
      "ACCESS_ADDRESS",
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
    // Processing logic after successful connection
  } catch (error) {
      console.error('Failed to connect to Arweave wallet:', error);
      // Handling connection failures
  }    
}



export const signMessageAsync = async (debug: boolean, arJWK: ArJWK, address: string, messageData: string): Promise<string> => {

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
