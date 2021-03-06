const express = require('express');

const router = express.Router();
const {
  getBalance,
  newWallet,
  getTransactions,
  sendTransaction,
} = require('../helpers/terra-helper');

router.get('/wallet/balance/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const balance = await getBalance(address);
    res.json({
      balance,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.get('/wallet/new', async (req, res) => {
  try {
    const mk = newWallet();
    const accountAddress = mk.accAddress;
    const { mnemonic } = mk;
    res.json({
      mnemonic,
      accountAddress,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.get('/transactions/in/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const transactions = await getTransactions(address);
    res.json({
      transactions,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

router.post('/tx/new', async (req, res) => {
  try {
    const {
      to, mnemonic, amount, memo,
    } = req.body;
    const response = await sendTransaction(amount, to, mnemonic, memo);
    res.json({
      result: response,
    });
  } catch (e) {
    console.log(e);
    res.json({
      error: e,
    });
  }
});

module.exports = router;
