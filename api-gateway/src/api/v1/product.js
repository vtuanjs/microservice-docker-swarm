const router = require('express').Router();
const apiHelper = require('../../api-helper');
const productManager = require('../../grpc/service-creator').create('ProductManager');

router.delete('/products/:id', async (req, res) => {
  try {
    let product = await productManager.request('delete', req.params);
    apiHelper.reply(res, product);
  } catch (error) {
    apiHelper.replyFailure(res, error);
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    let product = await productManager.request('create', {
      ...req.params,
      ...req.body
    });
    apiHelper.reply(res, product);
  } catch (error) {
    apiHelper.replyFailure(res, error);
  }
});

router.post('/products/', async (req, res) => {
  try {
    let product = await productManager.request('create', req.body);
    apiHelper.reply(res, product);
  } catch (error) {
    apiHelper.replyFailure(res, error);
  }
});

router.get('/products', async (req, res) => {
  try {
    let products = await productManager.request('list', req.query);
    apiHelper.reply(res, products);
  } catch (error) {
    apiHelper.replyFailure(res, error);
  }
});

module.exports = router;