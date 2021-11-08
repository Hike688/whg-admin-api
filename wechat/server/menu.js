const urlencode = require('urlencode');
const { appID } = require('../config/index');
const { Rooturl } = require('../config/index');
//重定向的地址
const redirct_url = `${Rooturl}/users/userinfo`;
//编码url
const temp_url = urlencode(redirct_url);
module.exports = {
    "button": [{
            "name": "我的",
            "sub_button": [{
                "type": "view",
                "name": "用户授权登录",
                "url": `${Rooturl}/users/userinfo`
            }]
        },
        {
            "name": "我是司机",
            "sub_button": [{
                    "type": "view",
                    "name": "堆场分布导览图",
                    "url": `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${temp_url}&response_type=code&scope=snsapi_base&state=MissionYardInformation#wechat_redirect`
                },
                {
                    "type": "view",
                    "name": "任务小票",
                    "url": `${Rooturl}/users/userinfo`
                }
            ]
        }
    ]
}