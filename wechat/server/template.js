//加工处理用户模版消息
module.exports = {
    TemplateMessage(message) {
        let date = new Date();
        let replyDate = date.getTime();
        let replyMessage = `<xml>
                    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                    <CreateTime>${replyDate}</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[${message.content}]]></Content>
                  </xml>`;

        return replyMessage;
    }
}



/**
 * 文字消息
 * `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${replyDate}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${content}]]></Content>
  </xml>`
  地理位置消息
  <xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>1351776360</CreateTime>
  <MsgType><![CDATA[location]]></MsgType>
  <Location_X>23.134521</Location_X>
  <Location_Y>113.358803</Location_Y>
  <Scale>20</Scale>
  <Label><![CDATA[位置信息]]></Label>
  <MsgId>1234567890123456</MsgId>
</xml>

关注和取消关注
<xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[FromUser]]></FromUserName>
  <CreateTime>123456789</CreateTime>
  <MsgType><![CDATA[event]]></MsgType>
  <Event><![CDATA[subscribe]]></Event>
</xml>

获取精度和维度
{
  ToUserName: 'gh_96337ebb5259',
  FromUserName: 'oPBuf6haO1mR_ASkIFsWdLxobmSE',
  CreateTime: '1635081294',
  MsgType: 'event',
  Event: 'LOCATION',
  Latitude: '31.284664',
  Longitude: '118.369400',
  Precision: '65.000000'
}

 */