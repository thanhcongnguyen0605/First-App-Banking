import TronWeb from "tronweb";

const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io',
    privateKey: '8dd0a6092513c583ceab8e8949b1e4a68a659e895f8cc5a89bdedbe6a39ae9ae'
})

export { tronWeb }