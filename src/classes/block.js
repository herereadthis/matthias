const sha256 = require('crypto-js/sha256');
const dayjs = require('dayjs');
const {isObject} = require('lodash');

module.exports = class Block {

    constructor(index = 0, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = Block.getTimestamp(timestamp);
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    static getTimestamp(timestamp) {
        if (!dayjs(timestamp).isValid()) {
            throw new Error('invalid date!');
        }
        return dayjs(timestamp).format();
    }

    calculateHash() {
        return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    toJSON() {
        return {
            index: this.index,
            timestamp: this.timestamp,
            data: this.data,
            previousHash: this.previousHash,
            hash: this.hash
        };
    }
}
