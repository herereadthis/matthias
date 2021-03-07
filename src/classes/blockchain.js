const sha256 = require('crypto-js/sha256');
const dayjs = require('dayjs');

const Block = require('./block');

class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(dayjs('2021-03-05T23:43:36-05:00').format(), 'genesis', '0');
    }

    get blockchainLength() {
        return this.chain.length;
    }

    get latestBlock() {
        return this.chain[this.blockchainLength - 1];
    }

    get isChainValid() {
        return this.chain.every((block, chainIndex) => {
            let valid = true;

            if (block.hash !== block.calculateHash()) {
                valid = false;
            }

            if (block.index !== chainIndex) {
                valid = false;
            }

            // The previous hash of genesis block is automatically valid.
            // Only check subsequent blocks.
            if (chainIndex > 0) {
                let previousBlock = this.chain[chainIndex - 1];

                if (block.previousHash !== previousBlock.hash) {
                    valid = false;
                }
            }
            return valid;
        });
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock.hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    toJSON() {
        return this.chain.map((block) => {
            return block.toJSON();
        });
    }
}



module.exports = Blockchain;
