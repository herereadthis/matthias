const sha256 = require('crypto-js/sha256');
const dayjs = require('dayjs');
const {isObject} = require('lodash');

module.exports = class Block {

    constructor(timestamp, data, previousHash = '') {
        this.timestamp = Block.getTimestamp(timestamp);
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        // The hash of the block will change if you change the contents of the block. Nonce value is a random number
        // that has nothing to do with the contents of the block.
        this.nonce = 0;
    }

    static getTimestamp(timestamp) {
        if (!dayjs(timestamp).isValid()) {
            throw new Error('invalid date!');
        }
        return dayjs(timestamp).format();
    }

    calculateHash() {
        return sha256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    /**
     *
     * Mining is computationally intensive as it has to calculate hashes until
     * it has enough preceding zeros.
     */
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            // keep figuring out new hashes until arrive at one with a number of zeros equal to difficulty
            this.hash = this.calculateHash();
        }
        console.log(`Block mined: ${this.hash}`);
    }

    toJSON() {
        const {
            timestamp,
            data,
            previousHash,
            hash,
            nonce
        } = this;
        return {
            timestamp,
            data,
            previousHash,
            hash,
            nonce
        };
    }
}
