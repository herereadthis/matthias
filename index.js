const {performance} = require('perf_hooks');
const Block = require('./src/classes/block');
const Blockchain = require('./src/classes/blockchain');

const matthiasCoin = new Blockchain();

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
