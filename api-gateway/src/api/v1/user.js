const router = require('express').Router();
const apiHelper = require('../../api-helper');
const userManager = require('../../grpc/service-creator').create('UserManager');

router.get('/users', async (req, res) => {
  try {
    let users = await userManager.request('list', req.query);
    apiHelper.reply(res, users);
  } catch (error) {
    apiHelper.replyFailure(res, error);
  }
});

router.post('/users', async (req, res) => {
  try {
    let user = await userManager.request('create', req.body);
    apiHelper.reply(res, user);
  } catch (error) {
    apiHelper.replyFailure(res, error);
  }
});

module.exports = router;