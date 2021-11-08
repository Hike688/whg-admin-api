const tencentcloud = require("tencentcloud-sdk-nodejs")
    // 导入对应产品模块的client models。
const smsClient = tencentcloud.sms.v20210111.Client
    /* 实例化要请求产品(以sms为例)的client对象 */
const { secretId, secretKey, SmsSdkAppId, SignName, TemplateId } = require('../config')
module.exports = {
    SendAuthCode(phonenumber) {
        function Authcode() {
            var AuthCode = '';
            for (let i = 0; i < 6; i++) {
                AuthCode += Math.floor(Math.random() * (10 - 1)) + 1;
            }
            return AuthCode;
        }
        var auth_code = Authcode();
        //传入用户手机号
        const params = {
            /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
            SmsSdkAppId: SmsSdkAppId,
            /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
            SignName: SignName,
            /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
            ExtendCode: "",
            /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
            SenderId: "",
            /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
            SessionContext: "",
            /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
             * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
            PhoneNumberSet: ["+86" + phonenumber],
            /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
            TemplateId: TemplateId,
            /* 模板参数: 若无模板参数，则设置为空*/
            TemplateParamSet: [auth_code, "5"],
        }
        const client = new smsClient({
            credential: {
                /* 必填：腾讯云账户密钥对secretId，secretKey。
                 * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
                 * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
                 * 以免泄露密钥对危及你的财产安全。
                 * CAM密匙查询: https://console.cloud.tencent.com/cam/capi */
                secretId: secretId,
                secretKey: secretKey,
            },
            /* 必填：地域信息，可以直接填写字符串ap-guangzhou，或者引用预设的常量 */
            region: "ap-guangzhou",
            /* 非必填:
             * 客户端配置对象，可以指定超时时间等配置 */
            profile: {
                /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
                signMethod: "HmacSHA256",
                httpProfile: {
                    /* SDK默认使用POST方法。
                     * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
                    reqMethod: "POST",
                    /* SDK有默认的超时时间，非必要请不要进行调整
                     * 如有需要请在代码中查阅以获取最新的默认值 */
                    reqTimeout: 30,
                    /**
                     * SDK会自动指定域名。通常是不需要特地指定域名的，但是如果你访问的是金融区的服务
                     * 则必须手动指定域名，例如sms的上海金融区域名： sms.ap-shanghai-fsi.tencentcloudapi.com
                     */
                    endpoint: "sms.tencentcloudapi.com"
                },
            },
        })
        return new Promise((resolve, reject) => {
            client.SendSms(params, function(err, response) {
                // 请求异常返回，打印异常信息
                if (err) {
                    reject(err)
                }
                var message = {};
                message['code'] = auth_code;
                message['response'] = response.SendStatusSet[0];
                // 请求正常返回，打印response对象
                resolve(message);
            })
        })
    }
}