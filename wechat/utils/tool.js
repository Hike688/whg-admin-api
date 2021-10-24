//xml解析成js对象
const { parseString } = require('xml2js');
module.exports = {
    //用户数据传输函数
    getUserDataAsync(req) {
        return new Promise((resolve, reject) => {
            let xmlData = ''
            req
                .on('data', data => {
                    //数据传递时 触发事件注入到回调函数中
                    // console.log(data)
                    //将 bufer 转换为字符串
                    xmlData += data.toString()
                })
                .on('end', () => {
                    //数据接收完毕出发close 事件
                    resolve(xmlData)
                })
        })
    },
    //用户数据解析
    parseXmlAsync(xmlData) {
        return new Promise((resolve, reject) => {
            parseString(xmlData, { trim: true }, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject('parseXmlAsync方法出了错误' + err);
                }
            })
        })

    },
    //格式化数据
    formatMessage(jsData) {
        let message = {};
        jsData = jsData.xml;
        //判断数据是否是一个对象
        if (typeof(jsData) === 'object') {
            for (let key in jsData) {
                message[key] = jsData[key][0];
                //过滤空字符串
            }
        }
        return message;
    }
}