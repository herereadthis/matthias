const Block = require('./src/classes/block');
const Blockchain = require('./src/classes/blockchain');

console.log('hello world');

const matthiasCoin = new Blockchain();

const newBlock = new Block(0, new Date(), {foo: 'bar'});

matthiasCoin.addBlock(newBlock);

console.log(matthiasCoin);

