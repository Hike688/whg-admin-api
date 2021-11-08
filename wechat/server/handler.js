//验证服务器有效性
const { getUserDataAsync, parseXmlAsync, formatMessage } = require('../utils/tool')
const sha1 = require('sha1')
const axios = require('axios')
const { SendAuthCode } = require('../utils/sms');
const { appID, appsecret } = require('../config/index')
const config = require('../config');
const { Rooturl } = require('../config/index');
const { ReplyUserMessages } = require('./replyUserMessage');
const urlencode = require('urlencode');
const { sql_UserInfo, sql_updateuerinfo } = require('../../db/mysql');
//验证服务器有效性
function ServerValid() {
    return async(req, res) => {
        const { signature, echostr, timestamp, nonce } = req.query;
        const { token } = config;
        const arr = [timestamp, nonce, token];
        arr.sort();
        const str = arr.join('');
        const sha1Str = sha1(str);
        //验证消息是否来自服务器
        if (sha1Str === signature) {
            res.send(echostr)
        } else {
            res.end('error')
        }
    }
}
//接收用户信息,并被动回复用户信息
function ReceiveUserInformation() {
    return async(req, res) => {
        const { signature, timestamp, nonce } = req.query;
        const { token } = config;
        const arr = [timestamp, nonce, token];
        arr.sort();
        const str = arr.join('');
        const sha1Str = sha1(str);
        if (sha1Str !== signature) {
            res.end('error');
        }
        //用户信息处理
        else {
            //接收用户数据函数
            const xmlData = await getUserDataAsync(req);
            //解析数据称js对象
            const jsData = await parseXmlAsync(xmlData);
            //格式化数据
            const message = formatMessage(jsData);
            console.log(message);
            //处理用户信息
            res.end(ReplyUserMessages(message));
            ///用户消息回复结束地方
        }
    }
}
//获取用户信息code
async function GetCode(current_code) {
    /**
     *https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
     */
    try {
        const result = await axios({
            method: 'get',
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
            params: {
                appid: appID,
                secret: appsecret,
                code: current_code,
                grant_type: 'authorization_code',
            }
        })
        return result;
    } catch (error) {
        return '请求出错' + error;
    }
}
//用户信息失效，重新获取code
function GetCookies(req, res) {
    const redirct_url = `${Rooturl}/users/getcode`;
    const temp_url = urlencode(redirct_url);
    res.redirect(301, `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${temp_url}&response_type=code&scope=snsapi_base&state=TaskReceipts#wechat_redirect`);
}
//手机号激活码
async function ActivationCode(req, res) {
    let userphone = req.query.phone;
    result = await SendAuthCode(userphone);
    res.json({ 'code': result.code });
}
//用户手机号激活
async function UserRegister(req, res) {
    console.log(req.query);
    console.log(await sql_updateuerinfo(req.query));
    res.json({ openid: req.cookies.openid });
}
//用户信息页
async function UserInfo(req, res) {
    if (req.cookies.openid || req.query.openid) { //cookies存在
        let openid = req.cookies.openid || req.query.opeind;
        var resulter = await sql_UserInfo(openid);
        if (resulter.code == 0) { //说明后台没有当前司机信息。可能是第一次登陆，也可能不是本系统司机               //返回注册页面进行手机短信验证
            res.render('login', { url: `${Rooturl}`, openid: openid })
        } else { //当前用户已经不是第一次登陆
            //将用户信息返回，并进入个人小票页面
            res.send(resulter);
        }
        console.log(req.cookies);
    } else { //cookies无效
        console.log({ 'code': '0', 'message': 'cookies失效！正在重新获取' });
        GetCookies(req, res);
    }
}
module.exports = { ServerValid, ReceiveUserInformation, GetCode, GetCookies, UserInfo, UserRegister, ActivationCode }