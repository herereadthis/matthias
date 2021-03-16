const sha256 = require('crypto-js/sha256');
const dayjs = require('dayjs');
const {isNil, isEmpty} = require('lodash');

const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(dayjs('2021-03-05T23:43:36-05:00').format(), [], '0');
    }

    get blockchainLength() {
        return this.chain.length;
    }

    get latestBlock() {
        return this.chain[this.blockchainLength - 1];
    }

    /**
     * Create a new block with all pending transactions, including a reward for
     * the miner. The block is added to the blockchain after mining. Then reset
     * the queue of pending transactions.
     *
     * @param {string} miningRewardAddress
     */
    minePendingTransactions(miningRewardAddress) {
        // the next block will pay the person who mined this block
        // the fromAddress is null because new coins are coming from the system.
        const rewardTransaction = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTransaction);

        const block = new Block(Date.now(), this.pendingTransactions, this.latestBlock.hash);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);

        // Reset the queue of transactions
        this.pendingTransactions = [];
    }

    /**
     * Receive a transaction, then add it to the list of pending transactions.
     *
     * @param transaction
     */
    addTransaction(transaction) {
        if (isNil(transaction.fromAddress)) {
            throw new Error('Transaction must include From Address');
        }
        if (isNil(transaction.toAddress)) {
            throw new Error('Transaction must include To Address');
        }
        if (!transaction.isValid) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransactions.push(transaction);
    }

    /**
     * The balance of an address is found by going through all transactions
     * involving that address and getting the sum. The coins don't actually
     * move from one wallet to another.
     * @returns {boolean}
     */
    getAddressBalance(address) {
        let balance = 0;
        const allTransactions = this.chain.flatMap(block => block.transactions);

        allTransactions.forEach((transaction) => {
            if (transaction.fromAddress === address) {
                balance -= transaction.amount;
            }
            if (transaction.toAddress === address) {
                balance += transaction.amount;
            }
        });
        return balance;
    }

    get isChainValid() {
        return this.chain.every((block, chainIndex) => {
            let valid = true;

            // make sure all transactions in current block are valid
            if (!block.hasValidTransactions()) {
                valid = false;
            }

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

    toJSON() {
        return this.chain.map((block) => {
            return block.toJSON();
        });
    }
}



module.exports = Blockchain;
