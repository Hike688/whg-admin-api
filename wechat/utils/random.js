var express = require('express');
var cookies = require('cookie-parser');
var app = express();
app.use(cookies());
app.get('/', function(req, res) {
    console.log(req.cookies);
    res.send('你好node。js')
})
app.get('/set', function(req, res) {
    res.cookie('openid', 'opzhewugs255fjksf', { path: '/', maxAge: 6000 });
    res.send('cookie设置成功');
})
app.get('/set/userinfo', function(req, res) {
    console.log(req.query);
    res.send(res.cookie.openid);
})
app.listen(3000, '127.0.0.1');