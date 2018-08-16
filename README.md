# EntereumInteract

This is Dapp, where you can interact with cryptocurrency via UI. (have some trouble with OS Windows)

## Installation

1. You should install NPM and NodeJS

2. Clone this repository

3. Open directory and run. This will all neсessary dependancies
```sh
$ npm install
```

4. Run in terminal. This initialise private blockchain on http://127.0.0.1:8545 with networkid 1347, compile and deploy(migrate) smart contract.
```sh
$ ganache-cli -p 8545 -i 1347
```
in other terminal window
```sh
$ truffle compile
$ truffle migrate --reset
$ npm run dev
```

5. Install extansion MetaMask in browser or browser Mist. They will connect to private blockchain via web3 API.

6. (for MetaMask) open extansion and import account wia private key, there are in first terminal window.

   (for Mist) open mist with comand in terminal:
```sh
$ mist --rpc http://127.0.0.1:8545
```
It will connect to private blockchain. After that, open http://localhost:3000
