//验证服务器有效性
const { getUserDataAsync, parseXmlAsync, formatMessage } = require('../utils/tool')
const sha1 = require('sha1')
const { appID, appsecret } = require('../config/index')
    //定义配置对象 
const config = require('../config');
const { ReplyUserMessages } = require('./replyUserMessage')
module.exports = {
    //验证服务器有效性
    ServerValid() {
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
    },
    //接收用户信息,并被动回复用户信息
    ReceiveUserInformation() {
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
    },
    //获取code
    async GetCode() {
        try {
            const result = await axios({
                method: 'get',
                url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=nsapi_userinfo&state=123#wechat_redirect`,
            })
            return result;
        } catch (error) {
            return '请求出错' + error;
        }
    }
}