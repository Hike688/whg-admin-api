const { SendAuthCode } = require('./sms');
(async() => {
    result = await SendAuthCode('15955853832')
    console.log(result);
})()