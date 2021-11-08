const { appID, appsecret } = require('../config')
const axios = require('axios')
const { sql_update, sql_chaXun } = require('../../db/mysql')
const menu = require('./menu')
class Wechat {
    constructor() {}
        // 获取access_token(getAccessToken) 
    async getAccessToken() {
            try {
                const result = await axios({
                    method: 'get',
                    url: 'https://api.weixin.qq.com/cgi-bin/token',
                    params: {
                        grant_type: 'client_credential',
                        appid: appID,
                        secret: appsecret
                    }
                })
                return result.data;
            } catch (error) {
                return '请求出错' + error;
            }
        }
        //保存下来(saveAccessToken)
    saveAccessToken(accessToken) {
            //将access_token保存文件
            return new Promise((resolve, reject) => {
                sql_update(accessToken).then(value => {
                    console.log(value);
                });
                resolve('保存成功');
            })

        }
        //读取(readAccessToken)
    readAccessToken() {
            //读取本地的access_token文件
            return new Promise((resolve, reject) => {
                try {
                    sql_chaXun().then(value => {
                        let data = value[0];
                        resolve(data);
                    })
                } catch (error) {
                    reject('access_token读取失败' + error);
                }

            })

        }
        // 读取本地文件 判断是否过期 isValidAccessToken
    isValidAccessToken(data) {
            // 验证传入的参数是否是有效的
            if (!data || !data.access_token || !data.expires_in) {
                //acess_token无效
                return false
            }

            // 检测access_token是否在有效期内
            let date = new Date();
            let dateNow = date.getTime();
            return data.expires_in > dateNow
                // 如果过期时间大于现在时间 返回ture
        }
        // 用来获取没有过期的access_token
    fetchAccessToken() {
            return new Promise((resolve) => {
                this.readAccessToken()
                    .then(async value => {
                        if (this.isValidAccessToken(value)) {
                            //是有效的
                            resolve(value); //

                        } else {
                            //过期了
                            const value = await this.getAccessToken()
                            await this.saveAccessToken(value);
                            //此时可直接使用
                            resolve(value); //
                        }
                    })
                    .catch(value => {
                        //读取失败
                        resolve(value);
                        this.getAccessToken().then(value => {
                            this.saveAccessToken(value);
                            //此时可直接使用
                            resolve(value); //
                        })

                    })
            })


        }
        //创建菜单
    creatMenu(menu) {
            return new Promise(async(resolve, reject) => {
                //定义请求地址
                const data = await this.fetchAccessToken();
                const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`;
                //发送消息
                try {
                    const result = await axios({
                        method: 'post',
                        url: url,
                        data: menu
                    })
                    resolve(result.data);
                } catch (error) {
                    reject('请求出错' + error);
                }

            })
        }
        //删除菜单
    deleMenu() {
        return new Promise(async(resolve, reject) => {
            //定义请求地址
            const data = await this.fetchAccessToken();
            const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${data.access_token}`;
            //发送消息
            try {
                const result = await axios({
                    method: 'get',
                    url: url
                })
                resolve(result.data);
            } catch (error) {
                reject('请求出错' + error);
            }

        })
    }

}
//立即执行函数
(async() => {
    const wx = new Wechat();
    let result = await wx.deleMenu();
    console.log(result);
    result = await wx.creatMenu(menu);
    console.log(result);
})()
// 读取本地文件