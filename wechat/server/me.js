const { sql_UserInfo } = require('../../db/mysql');
openid = 'oPBuf6haO1mR_ASkIFsWdLxobmSE';
sql_UserInfo(openid).then((value) => {
    console.log(value.code);
})