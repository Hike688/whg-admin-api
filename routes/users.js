var express = require('express');
var router = express.Router();
const { ServerValid, ReceiveUserInformation, GetCode, UserInfo, ActivationCode, UserRegister } = require('../wechat/server/handler')
    //导入数据库
    //验证服务器有效性，微信服务器发出get请求
router.get('/auth', ServerValid());
//回复用户信息
router.post('/auth', ReceiveUserInformation());

//手机号注册
router.get('/sms', function(req, res) {
    ActivationCode(req, res);
});

//用户注册
router.get('/register', function(req, res) {
    UserRegister(req, res);
});

//任务小票
router.get('/userinfo', function(req, res) {
    UserInfo(req, res);
});
//测试
router.get('/demo', function(req, res) {
    res.render('login', { url: 'http://localhost:3000' });
});



















//微信服务器发送的code
router.get('/getcode', async function(req, res) {
    let result = await GetCode(req.query.code);
    let openid = result.data.openid;
    //10秒后cookies失效
    res.cookie('openid', openid, { signed: false, maxAge: 10 * 1000, httpOnly: true })
    res.redirect(302, '/users/userinfo?openid=' + openid);
})


module.exports = router;