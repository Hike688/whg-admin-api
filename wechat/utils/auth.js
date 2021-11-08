function Authorize(req) {
    let List = Object.keys[req];
    if (!List) { //当前cookies无效
        return '空对象'
    } else { //当前cookies有效
        return req
    }
}
var obj = {}
console.log(Authorize(obj));