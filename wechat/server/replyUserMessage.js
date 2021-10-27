const { TemplateMessage } = require('./template')
module.exports = {
    ReplyUserMessages(message) {
        //接收文本消息
        let tempDate = '您说的什么，我听不懂～';
        if (message.MsgType === 'text') {
            if (message.Content === '1') { //全匹配
                tempDate = '欢迎来到芜湖港微信公众号'
            } else if (message.Content === '2') {
                tempDate = '查看任务小票'
            } else if (message.Content === '3') {
                tempDate = '查看堆场信息'
            } else if (message.Content === '4') {
                tempDate = '登陆页面～'
            } else if (message.Content.match('小姐姐')) { //半匹配
                tempDate = '小姐姐能不能看看程序猿～'
            } else if (message.Content.match('汪晨')) {
                tempDate = '汪晨不够持久，被王超甩了两个小时';
            } else {
                tempDate = '还在开发阶段';
            }
            message["content"] = tempDate;
        } //接收事件消息
        else {
            if (message.Event === 'subscribe') {
                message["content"] = '芜湖港电子小票服务公众号欢迎您～'
            }
            if (message.Event === 'unsubscribe') {
                message["content"] = '芜湖港电子小票服务号欢迎您的下次到来～'
            }

        }
        console.log(message);
        console.log(TemplateMessage(message));
        return TemplateMessage(message);

    }
}