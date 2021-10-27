const { request } = require('express');
var express = require('express');
var router = express.Router();
const { ServerValid, ReceiveUserInformation } = require('../wechat/server/handler')
    //手机验证码
const { SendAuthCode } = require('../wechat/utils/sms');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//验证服务器有效性，微信服务器发出get请求
router.get('/auth', ServerValid());
//回复用户信息
router.post('/auth', ReceiveUserInformation());
//手机号注册
router.get('/register', async(req, res, next) => {
    let userphone = req.query.phonenumber;
    result = await SendAuthCode(userphone);
    res.send(result);

});
module.exports = router;