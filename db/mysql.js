var mysql = require('mysql');
module.exports = {
    sql_chaXun: () => {
        return new Promise((resolve, reject) => {
            var sql_query = 'select * from api_token'
            var mysql = require('mysql');
            var db = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '12345678',
                port: '3306',
                database: 'wx_sql'
            });
            db.connect((err) => {
                if (err) throw err;
                else {
                    console.log('连接成功')
                }
            });
            db.query(sql_query, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject('数据库查询出错' + err);
                }
            });
            //断开连接
            db.end();
        })
    },
    //插入数据库
    sql_update: (params) => {
        return new Promise((resolve, reject) => {
            let { access_token, expires_in } = params;
            let date = new Date();
            expires_in = date.getTime() + 6900 * 1000;
            console.log(expires_in);
            var sql_update = 'update api_token set access_token =?,expires_in=? where id=?';
            var db = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '12345678',
                port: '3306',
                database: 'wx_sql'
            });
            db.connect((err) => {
                if (err) throw err;
                else {
                    console.log('连接成功')
                }
            });
            db.query(sql_update, [access_token, expires_in, '1'], (err) => {
                if (!err) {
                    resolve('数据库更新成功');
                } else {
                    reject('数据库更新出错' + err);
                }
            });
            //断开连接
            db.end();
        })
    }
}