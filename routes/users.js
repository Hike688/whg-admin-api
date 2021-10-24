var express = require('express');
var router = express.Router();
const { ServerValid, ReceiveUserInformation } = require('../wechat/server/handler')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//验证服务器有效性，微信服务器发出get请求
router.get('/auth', ServerValid());
//回复用户信息
router.post('/auth', ReceiveUserInformation());

module.exports = router;