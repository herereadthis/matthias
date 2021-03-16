const {performance} = require('perf_hooks');
const Block = require('./src/classes/block');
const Blockchain = require('./src/classes/blockchain');
const Transaction = require('./src/classes/transaction');
const KeyPair = require('./src/classes/key-pair');

const {ec: EC} = require('elliptic');
const ec = new EC('secp256k1');

const keyPair = {
    publicKey: '0467c9205869d234028dd58d7320503a4def9ef1a950a0dd69c48b7a7c564816eca9bb776db638bbd845e809455eba97030cce4ff5dda73999c722137ee00fcbba',
    privateKey: 'e4798c76bb5392626690a1d3c5c471a0d51afe4fa90eee30cba158c1f260786d'
};

const johnKey = new KeyPair();
const janeKey = new KeyPair();

const myKey = KeyPair.getKey(keyPair.privateKey);
const myWalletAddress = KeyPair.getPublicKey(myKey);

const matthiasCoin = new Blockchain();

const transaction1 = new Transaction(myWalletAddress, johnKey.publicKey, 60);
transaction1.signTransaction(myKey);
matthiasCoin.addTransaction(transaction1);

console.log('\nmyWalletAddress');
console.log(myWalletAddress);

console.log('\nStarting the miner....');
matthiasCoin.minePendingTransactions(myWalletAddress);

const transaction2 = new Transaction(johnKey.publicKey, janeKey.publicKey, 10);
transaction2.signTransaction(KeyPair.getKey(johnKey.privateKey));
matthiasCoin.addTransaction(transaction2);

console.log('\nStarting the miner....');
matthiasCoin.minePendingTransactions(johnKey.publicKey);

console.log(`\nMy wallet balance: ${matthiasCoin.getAddressBalance(myWalletAddress)}`);
console.log(`\nJohn's wallet balance: ${matthiasCoin.getAddressBalance(johnKey.publicKey)}`);
console.log(`\nJane's wallet balance: ${matthiasCoin.getAddressBalance(janeKey.publicKey)}`);


console.log(matthiasCoin.toJSON());


/*

let miningTimes = [];

miningTimes[matthiasCoin.blockchainLength - 1] = performance.now();
console.log(`Mining block ${matthiasCoin.blockchainLength}`);
matthiasCoin.addBlock(new Block(new Date(), {transaction: 24.95}));
miningTimes[matthiasCoin.blockchainLength - 1] = performance.now();
console.log(`Mining block ${matthiasCoin.blockchainLength}`);
matthiasCoin.addBlock(new Block(new Date(), {transaction: 14.50}));
miningTimes[matthiasCoin.blockchainLength - 1] = performance.now();
console.log(`Mining block ${matthiasCoin.blockchainLength}`);
matthiasCoin.addBlock(new Block(new Date(), {transaction: 23.75}));
miningTimes[matthiasCoin.blockchainLength - 1] = performance.now();
console.log(`Mining block ${matthiasCoin.blockchainLength}`);
matthiasCoin.addBlock(new Block(new Date(), {transaction: 49.00}));
miningTimes[matthiasCoin.blockchainLength - 1] = performance.now();

console.log(matthiasCoin.toJSON());
const miningDiffs = miningTimes.map((time, index) => {
    if (index === 0) {
        return 0;
    }
    return Math.round(time - miningTimes[index - 1]);
});
console.log(miningDiffs);
console.log(`isValid: ${matthiasCoin.isChainValid}`);
*/
