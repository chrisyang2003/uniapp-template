var express = require("express");
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")
    console.log('[+]', req.url)
    next()
})

app.get('/hello', function (req, res) {
    res.json({
        code: 200
    })
});

app.get('/user/login', function (req, res) {
    const user = req.query.account
    const passwd = req.query.password

    if (user == 'admin' && passwd == '123123') {
        res.json({
            code: 200,
            msg: '登陆成功'
        })
        return
    }
    res.json({
        code: 403,
        msg: '登陆失败'
    })
});

app.listen(3000);