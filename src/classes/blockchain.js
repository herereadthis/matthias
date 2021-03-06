const sha256 = require('crypto-js/sha256');
const dayjs = require('dayjs');

const Block = require('./block');

module.exports = class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '2021-03-05T23:43:36-05:00', 'Genesis Block', '0');
    }

    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    get isChainValid() {

    }

    addBlock(newBlock) {
        console.log(this.latestBlock);
        newBlock.previousHash = this.latestBlock.hash;
        console.log('previouHash', newBlock.previousHash);
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
