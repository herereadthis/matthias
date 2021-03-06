const Block = require('./src/classes/block');
const Blockchain = require('./src/classes/blockchain');

const matthiasCoin = new Blockchain();

matthiasCoin.addBlock(new Block(matthiasCoin.blockchainLength, new Date(), {transaction: 24.95}));
matthiasCoin.addBlock(new Block(matthiasCoin.blockchainLength, new Date(), {transaction: 14.50}));

console.log(matthiasCoin.toJSON());
console.log(`isValid: ${matthiasCoin.isChainValid}`);
