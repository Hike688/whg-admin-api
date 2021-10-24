//验证服务器有效性
const { getUserDataAsync, parseXmlAsync, formatMessage } = require('../utils/tool')
const sha1 = require('sha1')
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
    }
}

/**用户数据对象
 * {
  xml: {
    ToUserName: [ 'gh_96337ebb5259' ],
    FromUserName: [ 'oPBuf6haO1mR_ASkIFsWdLxobmSE' ],
    CreateTime: [ '1634953885' ],
    MsgType: [ 'text' ],
    Content: [ '1' ],
    MsgId: [ '23406913516358822' ]
  }
}
 */
/**回复模版消息
 *
 <xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>12345678</CreateTime>
  <MsgType><![CDATA[text]]></MsgType>
  <Content><![CDATA[你好]]></Content>
</xml>




 */